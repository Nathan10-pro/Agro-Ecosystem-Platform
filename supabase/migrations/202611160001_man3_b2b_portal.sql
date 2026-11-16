create extension if not exists pgcrypto;

create type public.man3_role as enum ('admin', 'mitra');
create type public.man3_account_status as enum ('pending_review', 'active', 'rejected', 'suspended');
create type public.man3_order_status as enum (
  'submitted', 'awaiting_confirmation', 'confirmed', 'preparing', 'packed',
  'in_delivery', 'delivered', 'completed', 'cancelled', 'rejected'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role public.man3_role not null default 'mitra',
  account_status public.man3_account_status not null default 'pending_review',
  is_demo boolean not null default false,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  company_name text not null,
  business_type text not null check (business_type in ('Restoran','Hotel','Catering','Retail','Distributor','Other')),
  business_address text,
  city text not null,
  partnership_status text not null default 'pending_review'
    check (partnership_status in ('pending_review','active','rejected','suspended')),
  partnership_start_date date,
  contract_start_date date,
  contract_end_date date,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (contract_end_date is null or contract_start_date is null or contract_end_date >= contract_start_date)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null default '',
  unit text not null,
  price numeric(14,2) not null check (price >= 0),
  available_stock numeric(14,3) not null default 0 check (available_stock >= 0),
  minimum_order_quantity numeric(14,3) not null default 1 check (minimum_order_quantity > 0),
  specifications jsonb not null default '{}'::jsonb,
  image_url text,
  status text not null default 'available' check (status in ('available','unavailable','archived')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  partner_id uuid not null references public.partners(id),
  subtotal numeric(14,2) not null check (subtotal >= 0),
  tax_rate numeric(5,4) not null default 0.1100 check (tax_rate >= 0),
  tax_amount numeric(14,2) not null check (tax_amount >= 0),
  delivery_cost numeric(14,2) not null default 0 check (delivery_cost >= 0),
  total_amount numeric(14,2) not null check (total_amount >= 0),
  delivery_slot text not null check (delivery_slot in ('subuh','siang')),
  order_status public.man3_order_status not null default 'submitted',
  notes text not null default '',
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  unit_price_snapshot numeric(14,2) not null check (unit_price_snapshot >= 0),
  quantity numeric(14,3) not null check (quantity > 0),
  line_total numeric(14,2) not null check (line_total >= 0)
);

create table public.order_tracking_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.man3_order_status not null,
  notes text not null default '',
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  movement_type text not null check (movement_type in ('restock','adjustment','order_confirmation','order_cancellation')),
  quantity numeric(14,3) not null check (quantity <> 0),
  reference_order_id uuid references public.orders(id) on delete set null,
  notes text not null default '',
  is_demo boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  details jsonb not null default '{}'::jsonb,
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.partnership_events (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  event_type text not null,
  notes text not null default '',
  is_demo boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index profiles_role_status_idx on public.profiles(role, account_status);
create index partners_status_city_idx on public.partners(partnership_status, city);
create index products_status_category_idx on public.products(status, category);
create index orders_partner_created_idx on public.orders(partner_id, created_at desc);
create index orders_status_created_idx on public.orders(order_status, created_at desc);
create index order_items_order_idx on public.order_items(order_id);
create index tracking_order_created_idx on public.order_tracking_events(order_id, created_at);
create index inventory_product_created_idx on public.inventory_movements(product_id, created_at desc);
create index activity_created_idx on public.admin_activity_logs(created_at desc);
create index partnership_events_partner_idx on public.partnership_events(partner_id, created_at desc);

create function public.is_man3_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and account_status = 'active'
  );
$$;

create function public.create_man3_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  full_name_value text := coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'full_name'), 150), ''), 'Mitra MAN3');
  company_value text := coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'company_name'), 200), ''), 'Belum dilengkapi');
  business_type_value text := coalesce(new.raw_user_meta_data ->> 'business_type', 'Other');
  city_value text := coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'city'), 100), ''), 'Belum diisi');
begin
  if business_type_value not in ('Restoran','Hotel','Catering','Retail','Distributor','Other') then
    business_type_value := 'Other';
  end if;
  insert into public.profiles (id, full_name, email, phone, role, account_status)
  values (new.id, full_name_value, lower(new.email), nullif(left(trim(new.raw_user_meta_data ->> 'phone'), 40), ''), 'mitra', 'pending_review');

  if nullif(new.raw_user_meta_data ->> 'company_name', '') is not null
    and nullif(new.raw_user_meta_data ->> 'city', '') is not null then
    insert into public.partners (profile_id, company_name, business_type, city)
    values (new.id, company_value, business_type_value, city_value);
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_man3
after insert on auth.users
for each row execute function public.create_man3_profile();

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger partners_updated_at before update on public.partners
for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

create function public.submit_partner_order(items jsonb, requested_slot text, order_notes text default '')
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  partner_row public.partners%rowtype;
  order_id_value uuid := gen_random_uuid();
  order_number_value text := 'MAN3-' || to_char(now() at time zone 'UTC', 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  subtotal_value numeric(14,2) := 0;
  line jsonb;
  product_row public.products%rowtype;
  quantity_value numeric(14,3);
begin
  if auth.uid() is null or jsonb_typeof(items) is distinct from 'array' then
    raise exception 'Pilih setidaknya satu produk.';
  end if;
  if jsonb_array_length(items) = 0 then raise exception 'Pilih setidaknya satu produk.'; end if;
  if requested_slot not in ('subuh','siang') then
    raise exception 'Slot pengiriman tidak valid.';
  end if;

  select * into partner_row from public.partners
  where profile_id = auth.uid() and partnership_status = 'active';
  if not found then raise exception 'Hanya mitra aktif yang dapat membuat pesanan.'; end if;

  for line in select value from jsonb_array_elements(items)
  loop
    quantity_value := (line ->> 'quantity')::numeric;
    select * into product_row from public.products
    where id = (line ->> 'product_id')::uuid and status = 'available';
    if not found then raise exception 'Produk tidak tersedia.'; end if;
    if quantity_value <= 0 or quantity_value < product_row.minimum_order_quantity then
      raise exception 'Jumlah pesanan di bawah minimum untuk produk %.', product_row.name;
    end if;
    if product_row.available_stock < quantity_value then
      raise exception 'Stok tidak mencukupi untuk produk %.', product_row.name;
    end if;
    subtotal_value := subtotal_value + round(product_row.price * quantity_value, 2);
  end loop;

  if subtotal_value <= 0 then raise exception 'Nilai pesanan tidak valid.'; end if;
  insert into public.orders (id, order_number, partner_id, subtotal, tax_amount, total_amount, delivery_slot, notes)
  values (order_id_value, order_number_value, partner_row.id, subtotal_value,
    round(subtotal_value * 0.11, 2), round(subtotal_value * 1.11, 2),
    requested_slot, left(coalesce(order_notes, ''), 1000));

  for line in select value from jsonb_array_elements(items)
  loop
    quantity_value := (line ->> 'quantity')::numeric;
    select * into product_row from public.products
    where id = (line ->> 'product_id')::uuid and status = 'available';
    insert into public.order_items (order_id, product_id, product_name_snapshot, unit_price_snapshot, quantity, line_total)
    values (order_id_value, product_row.id, product_row.name, product_row.price, quantity_value,
      round(product_row.price * quantity_value, 2));
  end loop;

  insert into public.order_tracking_events (order_id, status, notes, updated_by)
  values (order_id_value, 'submitted', 'Pesanan diajukan oleh mitra.', auth.uid());
  return order_id_value;
end;
$$;

create function public.update_partner_profile(
  full_name_value text,
  phone_value text,
  company_name_value text,
  business_type_value text,
  address_value text,
  city_value text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  partner_row public.partners%rowtype;
  changed boolean;
begin
  if auth.uid() is null then raise exception 'Sesi tidak valid.'; end if;
  select * into partner_row from public.partners where profile_id = auth.uid() for update;
  if not found then raise exception 'Profil mitra tidak ditemukan.'; end if;
  if exists (select 1 from public.profiles where id = auth.uid() and role <> 'mitra') then
    raise exception 'Akses mitra diperlukan.';
  end if;
  if length(trim(full_name_value)) not between 1 and 150
    or length(trim(company_name_value)) not between 1 and 200
    or length(trim(city_value)) not between 1 and 100
    or business_type_value not in ('Restoran','Hotel','Catering','Retail','Distributor','Other')
    or length(trim(phone_value)) not between 6 and 40
    or length(coalesce(address_value, '')) > 500 then
    raise exception 'Informasi profil tidak valid.';
  end if;
  changed := partner_row.company_name <> trim(company_name_value)
    or partner_row.business_type <> business_type_value
    or coalesce(partner_row.business_address, '') <> coalesce(trim(address_value), '')
    or partner_row.city <> trim(city_value);

  update public.profiles set full_name = trim(full_name_value), phone = trim(phone_value) where id = auth.uid();
  update public.partners set company_name = trim(company_name_value), business_type = business_type_value,
    business_address = nullif(trim(coalesce(address_value, '')), ''), city = trim(city_value)
  where id = partner_row.id;
  if changed then
    insert into public.partnership_events (partner_id, event_type, notes, created_by, is_demo)
      values (partner_row.id, 'profile_updated', 'Mitra memperbarui informasi usaha.', auth.uid(), partner_row.is_demo);
  end if;
end;
$$;

create function public.admin_update_order_status(order_id_value uuid, next_status public.man3_order_status, status_notes text default '')
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_row public.orders%rowtype;
  item_row record;
begin
  if not public.is_man3_admin() then raise exception 'Akses admin diperlukan.'; end if;
  select * into order_row from public.orders where id = order_id_value for update;
  if not found then raise exception 'Pesanan tidak ditemukan.'; end if;
  if order_row.order_status = next_status then return; end if;
  if next_status = 'cancelled' and length(trim(coalesce(status_notes, ''))) = 0 then
    raise exception 'Alasan pembatalan wajib dicatat.';
  end if;
  if not (
    (order_row.order_status = 'submitted' and next_status in ('awaiting_confirmation','confirmed','rejected','cancelled'))
    or (order_row.order_status = 'awaiting_confirmation' and next_status in ('confirmed','rejected','cancelled'))
    or (order_row.order_status = 'confirmed' and next_status in ('preparing','cancelled'))
    or (order_row.order_status = 'preparing' and next_status in ('packed','cancelled'))
    or (order_row.order_status = 'packed' and next_status in ('in_delivery','cancelled'))
    or (order_row.order_status = 'in_delivery' and next_status = 'delivered')
    or (order_row.order_status = 'delivered' and next_status = 'completed')
  ) then raise exception 'Perubahan status pesanan tidak diizinkan.'; end if;

  if order_row.order_status in ('confirmed','preparing','packed') and next_status = 'cancelled' then
    for item_row in select product_id, quantity from public.order_items where order_id = order_id_value and product_id is not null
    loop
      update public.products set available_stock = available_stock + item_row.quantity where id = item_row.product_id;
      insert into public.inventory_movements (product_id, movement_type, quantity, reference_order_id, notes, created_by, is_demo)
      values (item_row.product_id, 'order_cancellation', item_row.quantity, order_id_value, left(status_notes, 1000), auth.uid(), order_row.is_demo);
    end loop;
  elsif order_row.order_status <> 'confirmed' and next_status = 'confirmed' then
    for item_row in select product_id, product_name_snapshot, quantity from public.order_items where order_id = order_id_value
    loop
      if item_row.product_id is null then raise exception 'Produk pada pesanan tidak tersedia.'; end if;
      update public.products set available_stock = available_stock - item_row.quantity
      where id = item_row.product_id and status = 'available' and available_stock >= item_row.quantity;
      if not found then raise exception 'Stok produk % tidak mencukupi.', item_row.product_name_snapshot; end if;
      insert into public.inventory_movements (product_id, movement_type, quantity, reference_order_id, notes, created_by, is_demo)
      values (item_row.product_id, 'order_confirmation', -item_row.quantity, order_id_value, left(status_notes, 1000), auth.uid(), order_row.is_demo);
    end loop;
  end if;

  update public.orders set order_status = next_status where id = order_id_value;
  insert into public.order_tracking_events (order_id, status, notes, updated_by)
  values (order_id_value, next_status, left(coalesce(status_notes, ''), 1000), auth.uid());
  insert into public.admin_activity_logs (admin_id, action, target_type, target_id, details, is_demo)
  values (auth.uid(), 'order_status_updated', 'order', order_id_value,
    jsonb_build_object('from', order_row.order_status, 'to', next_status, 'notes', left(coalesce(status_notes, ''), 1000)), order_row.is_demo);
end;
$$;

create function public.admin_set_partner_status(partner_id_value uuid, next_status public.man3_account_status, start_date date default null, notes_value text default '')
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  partner_row public.partners%rowtype;
begin
  if not public.is_man3_admin() then raise exception 'Akses admin diperlukan.'; end if;
  select * into partner_row from public.partners where id = partner_id_value for update;
  if not found then raise exception 'Mitra tidak ditemukan.'; end if;

  update public.profiles set account_status = next_status,
    approved_at = case when next_status = 'active' then coalesce(approved_at, now()) else approved_at end
  where id = partner_row.profile_id;
  update public.partners set partnership_status = next_status,
    partnership_start_date = case when next_status = 'active' then coalesce(start_date, partnership_start_date) else partnership_start_date end
  where id = partner_id_value;

  insert into public.partnership_events (partner_id, event_type, notes, created_by, is_demo)
  values (partner_id_value, next_status::text, left(coalesce(notes_value, ''), 1000), auth.uid(), partner_row.is_demo);
  insert into public.admin_activity_logs (admin_id, action, target_type, target_id, details, is_demo)
  values (auth.uid(), 'partner_status_updated', 'partner', partner_id_value,
    jsonb_build_object('status', next_status, 'partnership_start_date', start_date, 'notes', left(coalesce(notes_value, ''), 1000)), partner_row.is_demo);
end;
$$;

create function public.admin_update_partner_information(
  partner_id_value uuid,
  company_name_value text,
  business_type_value text,
  address_value text,
  city_value text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  partner_row public.partners%rowtype;
begin
  if not public.is_man3_admin() then raise exception 'Akses admin diperlukan.'; end if;
  select * into partner_row from public.partners where id = partner_id_value for update;
  if not found then raise exception 'Mitra tidak ditemukan.'; end if;
  if length(trim(company_name_value)) not between 1 and 200
    or length(trim(city_value)) not between 1 and 100
    or business_type_value not in ('Restoran','Hotel','Catering','Retail','Distributor','Other')
    or length(coalesce(address_value, '')) > 500 then
    raise exception 'Informasi usaha tidak valid.';
  end if;

  update public.partners set company_name = trim(company_name_value), business_type = business_type_value,
    business_address = nullif(trim(coalesce(address_value, '')), ''), city = trim(city_value)
  where id = partner_id_value;
  insert into public.partnership_events (partner_id, event_type, notes, created_by, is_demo)
  values (partner_id_value, 'admin_profile_updated', 'Admin memperbarui informasi usaha mitra.', auth.uid(), partner_row.is_demo);
  insert into public.admin_activity_logs (admin_id, action, target_type, target_id, details, is_demo)
  values (auth.uid(), 'partner_profile_updated', 'partner', partner_id_value,
    jsonb_build_object('previous_company', partner_row.company_name, 'company', trim(company_name_value),
      'previous_business_type', partner_row.business_type, 'business_type', business_type_value,
      'previous_city', partner_row.city, 'city', trim(city_value)), partner_row.is_demo);
end;
$$;

create function public.admin_adjust_inventory(product_id_value uuid, new_stock numeric, movement_notes text default '')
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_stock numeric(14,3);
  delta numeric(14,3);
  product_demo boolean;
begin
  if not public.is_man3_admin() then raise exception 'Akses admin diperlukan.'; end if;
  if new_stock < 0 then raise exception 'Stok tidak boleh negatif.'; end if;
  select available_stock, is_demo into old_stock, product_demo from public.products where id = product_id_value for update;
  if not found then raise exception 'Produk tidak ditemukan.'; end if;
  delta := new_stock - old_stock;
  update public.products set available_stock = new_stock where id = product_id_value;
  if delta <> 0 then
    insert into public.inventory_movements (product_id, movement_type, quantity, notes, created_by, is_demo)
    values (product_id_value, 'adjustment', delta, left(coalesce(movement_notes, ''), 1000), auth.uid(), product_demo);
    insert into public.admin_activity_logs (admin_id, action, target_type, target_id, details, is_demo)
    values (auth.uid(), 'inventory_adjusted', 'product', product_id_value,
      jsonb_build_object('previous_stock', old_stock, 'new_stock', new_stock, 'delta', delta, 'notes', left(coalesce(movement_notes, ''), 1000)),
      (select is_demo from public.products where id = product_id_value));
  end if;
end;
$$;

create function public.log_product_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  action_value text;
  target_value uuid;
  details_value jsonb;
begin
  if tg_op = 'INSERT' then
    action_value := 'product_created';
    target_value := new.id;
    details_value := jsonb_build_object('name', new.name, 'price', new.price, 'status', new.status);
  elsif tg_op = 'UPDATE' then
    action_value := case when old.price is distinct from new.price then 'product_price_updated' else 'product_updated' end;
    target_value := new.id;
    details_value := jsonb_build_object('name', new.name, 'previous_price', old.price, 'price', new.price, 'status', new.status);
  else
    action_value := 'product_deleted';
    target_value := old.id;
    details_value := jsonb_build_object('name', old.name);
  end if;
  insert into public.admin_activity_logs (admin_id, action, target_type, target_id, details, is_demo)
  values (auth.uid(), action_value, 'product', target_value, details_value,
    case when tg_op = 'DELETE' then old.is_demo else new.is_demo end);
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create trigger products_activity_log
after insert or update or delete on public.products
for each row execute function public.log_product_change();

revoke all on public.profiles, public.partners, public.products, public.orders, public.order_items,
  public.order_tracking_events, public.inventory_movements, public.admin_activity_logs, public.partnership_events
  from anon, authenticated;
grant select on public.profiles, public.partners, public.products, public.orders, public.order_items,
  public.order_tracking_events, public.inventory_movements, public.admin_activity_logs, public.partnership_events
  to authenticated;
grant insert, update, delete on public.products to authenticated;

alter table public.profiles enable row level security;
alter table public.partners enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_tracking_events enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.admin_activity_logs enable row level security;
alter table public.partnership_events enable row level security;

create policy "profiles read self or admin" on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_man3_admin()));
revoke insert, update, delete on public.profiles from authenticated;
create policy "profiles update own safe fields" on public.profiles for update to authenticated
using (id = (select auth.uid()) and role = 'mitra')
with check (id = (select auth.uid()) and role = 'mitra');

create policy "partners read own or admin" on public.partners for select to authenticated
using (profile_id = (select auth.uid()) or (select public.is_man3_admin()));
revoke insert, update, delete on public.partners from authenticated;
create policy "partners update own" on public.partners for update to authenticated
using (profile_id = (select auth.uid()) and partnership_status <> 'suspended')
with check (profile_id = (select auth.uid()) and partnership_status in ('pending_review','active','rejected'));
create policy "admins manage partners" on public.partners for all to authenticated
using ((select public.is_man3_admin())) with check ((select public.is_man3_admin()));

create policy "authenticated read available products" on public.products for select to authenticated
using (status <> 'archived' or (select public.is_man3_admin()));
create policy "admins manage products" on public.products for all to authenticated
using ((select public.is_man3_admin())) with check ((select public.is_man3_admin()));

create policy "orders read own or admin" on public.orders for select to authenticated
using (
  exists (select 1 from public.partners p where p.id = partner_id and p.profile_id = (select auth.uid()))
  or (select public.is_man3_admin())
);
create policy "order items read own or admin" on public.order_items for select to authenticated
using (
  exists (select 1 from public.orders o join public.partners p on p.id = o.partner_id
    where o.id = order_id and (p.profile_id = (select auth.uid()) or (select public.is_man3_admin())))
);
create policy "tracking read own or admin" on public.order_tracking_events for select to authenticated
using (
  exists (select 1 from public.orders o join public.partners p on p.id = o.partner_id
    where o.id = order_id and (p.profile_id = (select auth.uid()) or (select public.is_man3_admin())))
);
create policy "inventory read admin only" on public.inventory_movements for select to authenticated
using ((select public.is_man3_admin()));
create policy "activity read admin only" on public.admin_activity_logs for select to authenticated
using ((select public.is_man3_admin()));
create policy "partnership events read own or admin" on public.partnership_events for select to authenticated
using (
  exists (select 1 from public.partners p where p.id = partner_id and (p.profile_id = (select auth.uid()) or (select public.is_man3_admin())))
);

revoke insert, update, delete on public.orders, public.order_items, public.order_tracking_events,
  public.inventory_movements, public.admin_activity_logs, public.partnership_events from authenticated;
revoke insert, update, delete on public.admin_activity_logs from authenticated;
revoke all on function public.submit_partner_order(jsonb, text, text) from public;
grant execute on function public.submit_partner_order(jsonb, text, text) to authenticated;
revoke all on function public.update_partner_profile(text, text, text, text, text, text) from public;
grant execute on function public.update_partner_profile(text, text, text, text, text, text) to authenticated;
revoke all on function public.admin_update_order_status(uuid, public.man3_order_status, text) from public;
grant execute on function public.admin_update_order_status(uuid, public.man3_order_status, text) to authenticated;
revoke all on function public.admin_set_partner_status(uuid, public.man3_account_status, date, text) from public;
grant execute on function public.admin_set_partner_status(uuid, public.man3_account_status, date, text) to authenticated;
revoke all on function public.admin_update_partner_information(uuid, text, text, text, text) from public;
grant execute on function public.admin_update_partner_information(uuid, text, text, text, text) to authenticated;
revoke all on function public.admin_adjust_inventory(uuid, numeric, text) from public;
grant execute on function public.admin_adjust_inventory(uuid, numeric, text) to authenticated;
revoke all on function public.is_man3_admin() from public;
grant execute on function public.is_man3_admin() to authenticated;

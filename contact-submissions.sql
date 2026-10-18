-- Enquiries from the Contact and Request Samples forms.
-- Written only by the submit-contact edge function (service role); RLS is on
-- with no policies, so the public key can't read or write it.

create table if not exists public.contact_submissions (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  form             text not null check (form in ('contact', 'samples')),
  first_name       text not null,
  last_name        text,
  email            text not null,
  phone            text,
  company          text,
  project_type     text,
  message          text,
  materials        text[],
  colors           text[],
  shipping_address text,
  city             text,
  email_sent       boolean not null default false
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

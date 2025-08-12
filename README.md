# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1462ad92-37c2-4e6e-bd11-4339782da468

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1462ad92-37c2-4e6e-bd11-4339782da468) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1462ad92-37c2-4e6e-bd11-4339782da468) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Supabase setup

Create a `.env.local` with:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Database schema

Run this SQL in Supabase:

```sql
-- Enable extensions (Supabase usually has these by default)
create extension if not exists "uuid-ossp";

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_zalo text,
  account_type text not null,
  store_account text,
  customer_account text,
  customer_password text,
  customer_otp_secret text,
  start_date date not null,
  duration_months int not null check (duration_months between 1 and 24),
  end_date date not null,
  cost numeric not null default 0,
  revenue numeric not null default 0,
  note text
);

-- Enable RLS and allow authenticated read/write (adjust to your auth model)
alter table public.orders enable row level security;
create policy "orders anon read" on public.orders
  for select to anon using (true);
create policy "orders anon write" on public.orders
  for insert to anon with check (true);
create policy "orders anon update" on public.orders
  for update to anon using (true) with check (true);
create policy "orders anon delete" on public.orders
  for delete to anon using (true);
```

Then open `/admin/orders` to manage orders.

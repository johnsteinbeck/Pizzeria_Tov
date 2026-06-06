# Pizzeria Tov Production Setup

Public menu URL:
https://pizzeria-tov.vercel.app

Admin URL:
https://pizzeria-tov.vercel.app/admin.html

This project is a static HTML/CSS/JS site hosted on the free Vercel subdomain. Menu products, prices, visibility, order, and uploaded product images are stored in Supabase. Do not use a local JSON file or browser storage as permanent menu storage.

## 1. Supabase Project

1. Create a Supabase project.
2. Open Supabase Dashboard > SQL Editor.
3. Run `supabase-menu-schema.sql`.
4. In the SQL file, replace `owner@example.com` with the restaurant owner's real email, or run:

```sql
update public.app_admins
set email = 'OWNER_EMAIL_HERE'
where email = 'owner@example.com';
```

5. Supabase creates the `product-images` Storage bucket through the SQL file.
6. Product images uploaded from `admin.html` are saved in Supabase Storage and the product row stores the Storage path.

## 2. Admin Login Removed

This version removes Supabase Magic Link login from `admin.html`.

Admin URL:

```text
https://pizzeria-tov.vercel.app/admin.html
```

Important: anyone who knows this URL can open the admin panel. To make add, update, delete, and image upload work without login, the SQL file allows `anon` write access through RLS policies. This is convenient for very simple use, but it is not secure for a public production site.

After deploying these files, open Supabase Dashboard > SQL Editor and run `supabase-menu-schema.sql` again so the no-login RLS policies are applied.

## 3. Connect The Website

Open `config.js` and replace:

```js
supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
```

Use Supabase Dashboard > Project Settings > API:

- Project URL goes into `supabaseUrl`
- anon public key goes into `supabaseAnonKey`

Never put a Supabase service role key in this static site.

## 4. Deploy To Vercel

Use Vercel with no custom domain.

Git method:

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework Preset: Other.
4. Build Command: leave empty.
5. Output Directory: leave empty.
6. Deploy.
7. Set the project name to `pizzeria-tov` so the production subdomain becomes:

```text
https://pizzeria-tov.vercel.app
```

CLI method:

```powershell
npm i -g vercel
vercel --prod
```

Choose this project folder as the root. Do not add a custom domain.

## 5. QR Code

`qr-code.svg` points to:

```text
https://pizzeria-tov.vercel.app
```

Use this SVG for printed QR cards, table stickers, or Instagram highlights. Regenerate it only if the public menu URL changes.

## 6. Owner Workflow

1. Visit `https://pizzeria-tov.vercel.app/admin.html`.
2. The admin panel opens directly. No Magic Link email is sent.
3. Add products, update prices, upload photos, change product order, hide/show products, or delete products.
4. Public visitors only see visible products on `https://pizzeria-tov.vercel.app`.

## References

- Supabase JavaScript client: https://supabase.com/docs/reference/javascript/initializing
- Supabase Magic Link login: https://supabase.com/docs/guides/auth/auth-email-passwordless
- Supabase Storage uploads: https://supabase.com/docs/reference/javascript/storage-from-upload
- Supabase Storage public URLs: https://supabase.com/docs/guides/storage/serving/downloads
- Supabase Storage overview: https://supabase.com/docs/guides/storage
- Vercel deployments: https://vercel.com/docs/deployments

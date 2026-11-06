# SellerGenly — Real SaaS foundation

This build keeps Supabase authentication and adds a real Products workspace.

## Current real functionality
- Supabase email/password authentication.
- Email confirmation flow.
- Protected dashboard.
- Products are inserted into `public.products` with the authenticated user's `user_id`.
- Row Level Security policies ensure users can only read, create, update, and delete their own products.
- Product profit and margin are calculated from saved economics.

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Supabase
Run `supabase/schema.sql` once in the SQL Editor. The existing schema is enough for this Products stage.

## Deployment
Deploy the project to Vercel and add the two environment variables to Preview and Production.

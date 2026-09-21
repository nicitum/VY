/*
# Create wedding_wishes table (single-tenant, no auth)

1. New Tables
- `wedding_wishes`
- `id` (uuid, primary key)
- `name` (text, not null) — name of the person leaving a wish
- `message` (text, not null) — the heartfelt wish/blessing message
- `attending` (text, not null) — "yes" or "no" indicating attendance
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `wedding_wishes`.
- Allow anon + authenticated to read all wishes (public/shared data for wedding invitation).
- Allow anon + authenticated to insert new wishes.
- No update or delete needed.

3. Notes
- This is a no-auth wedding invitation site. All wishes are publicly visible.
- Anyone can submit a wish without signing in.
*/

CREATE TABLE IF NOT EXISTS wedding_wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  attending text NOT NULL DEFAULT 'yes',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wedding_wishes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_wishes" ON wedding_wishes;
CREATE POLICY "anon_select_wishes" ON wedding_wishes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_wishes" ON wedding_wishes;
CREATE POLICY "anon_insert_wishes" ON wedding_wishes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_wishes" ON wedding_wishes;
CREATE POLICY "anon_update_wishes" ON wedding_wishes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_wishes" ON wedding_wishes;
CREATE POLICY "anon_delete_wishes" ON wedding_wishes FOR DELETE
  TO anon, authenticated USING (true);

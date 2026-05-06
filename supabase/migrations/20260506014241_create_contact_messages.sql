/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, required) - sender's full name
      - `email` (text, required) - sender's email address
      - `phone` (text, optional) - sender's WhatsApp/phone number
      - `message` (text, required) - order details or message body
      - `created_at` (timestamptz, defaults to now)

  2. Security
    - Enable RLS on `contact_messages` table
    - Public insert policy: anyone can submit a contact form (unauthenticated OK)
    - Authenticated select policy: only authenticated users can read messages (admin use)

  3. Notes
    - Phone is optional as not all visitors may provide it
    - RLS insert policy allows anonymous submissions for the contact form
    - No update/delete policies needed - messages are append-only
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0 AND
    length(trim(email)) > 0 AND
    length(trim(message)) > 0
  );

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

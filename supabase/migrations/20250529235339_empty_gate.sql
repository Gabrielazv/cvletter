/*
  # Initial schema setup for CVLetter

  1. New Tables
    - users
      - Custom user data including free generation counter and pro status
    - letters
      - Stores generated cover letters with metadata
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Create users table extension
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  free_generations_left integer NOT NULL DEFAULT 3,
  is_pro boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create letters table
CREATE TABLE IF NOT EXISTS letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  job_title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  creativity integer NOT NULL,
  cv_url text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own letters"
  ON letters
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own letters"
  ON letters
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, free_generations_left, is_pro)
  VALUES (new.id, new.email, 3, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
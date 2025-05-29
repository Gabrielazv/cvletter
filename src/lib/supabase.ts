import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
  letters: {
    id: string
    user_id: string
    job_title: string
    company: string
    location: string
    description: string
    creativity: number
    cv_url: string
    content: string
    created_at: string
  }
  users: {
    id: string
    email: string
    free_generations_left: number
    is_pro: boolean
  }
}
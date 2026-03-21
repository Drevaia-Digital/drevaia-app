import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hkjiqihczalnekzuwjtw.supabase.co";
const supabaseAnonKey = "sb_publishable_7xUGlgvxEncNPPSO646vsw_LB30RW5Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id?: string;
  author_name: string;
  author_email?: string;
  content: string;
  parent_id?: string;
  likes: number;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  replies?: Comment[];
}

export interface Favorite {
  id: string;
  user_id: string;
  item_id: string;
  item_type: 'book' | 'post';
  title: string;
  url: string;
  image?: string;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  book_id: string;
  book_title: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method?: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  language: string;
  subscribed: boolean;
  created_at: string;
}

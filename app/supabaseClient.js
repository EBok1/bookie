import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("Supabase URL:", supabaseUrl ? "✅ Found" : "❌ Missing");
console.log("Supabase Key:", supabaseKey ? "✅ Found" : "❌ Missing");

// Create client if we have both URL and key
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

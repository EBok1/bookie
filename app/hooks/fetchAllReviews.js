import { supabase } from "../supabaseClient";

export default async function fetchAllReviews() {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return { data: [] };
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .select()
     
    console.log("✅ Get comments result", ":", { data, error });
    return { data: data || [] };
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return { data: [] };
  }
}

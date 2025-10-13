import { supabase } from "../../../app/supabaseClient";

export async function getBookCommentsById(id) {
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
      .eq("book_id", id);
    console.log("✅ Get comments result for book", id, ":", { data, error });
    return { data: data || [] };
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return { data: [] };
  }
}

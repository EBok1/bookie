import { supabase } from "../../../app/supabaseClient";

export async function addReviewToList(reviewData) {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return {
      data: null,
      error: {
        message:
          "Database connection not available. Please check configuration.",
      },
    };
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([reviewData]);
    console.log("✅ Add review result:", { data, error });
    return { data, error };
  } catch (err) {
    console.error("❌ Add review error:", err);
    return { data: null, error: err };
  }
}

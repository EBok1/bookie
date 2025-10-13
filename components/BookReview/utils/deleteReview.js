import { supabase } from "../../../app/supabaseClient";

export async function deleteReview(reviewId) {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return {
      error: {
        message:
          "Database connection not available. Please check configuration.",
      },
    };
  }

  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", reviewId);
    console.log("✅ Delete review result:", { error });
    return { error };
  } catch (err) {
    console.error("❌ Delete review error:", err);
    return { error: err };
  }
}

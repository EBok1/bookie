import { supabase } from "../../../supabaseClient";

export async function deleteReview(reviewId) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", reviewId);
      return { error };
  }
import { supabase } from "../../../supabaseClient";

export async function addReviewToList(reviewData) {
  const { data, error } = await supabase.from("comments").insert([reviewData]);
  return { data, error };
}

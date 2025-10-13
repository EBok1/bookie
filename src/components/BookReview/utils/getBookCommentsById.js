import { supabase } from "../../../supabaseClient";

export async function getBookCommentsById(id) {
    const { data } = await supabase.from("comments").select().eq("book_id", id);
    return { data };
  }
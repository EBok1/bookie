import { supabase } from "../supabaseClient";

const fetchBooks = async () => {
  try {
    const { data, error } = await supabase.from("books").select("*");
    console.log(data);
    return { data };
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return { data: [] };
  }
};

export default fetchBooks;

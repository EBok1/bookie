import booksList from "../mocks/books.json";
import { supabase } from "../supabaseClient";

const fetchBookById = async (id) => {
  if (!id) [];
  // const foundBook = booksList.find((book) => book.id == id);
  // return foundBook;
  try {
    const { data, error } = await supabase.from("books").select().eq("id", id);
    console.log(data);
    return { data: data[0] || [] };
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return { data: [] };
  }
};

export default fetchBookById;

import { supabase } from "../../supabaseClient";

export async function GET() {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ genres: [] });
  }
  try {
    const { data: booksData, error } = await supabase
      .from("books")
      .select("genre");

    if (error) {
      console.log("Get genres error", error);
      return Response.json({ genres: [] });
    }

    const uniqueGenres = [...new Set(booksData.map((book) => book.genre))]
      .filter((genre) => genre)
      .sort();

    return Response.json({ genres: uniqueGenres });
  } catch (err) {
    console.error("❌ Get genres error:", err);
    return Response.json({ genres: [] }, { status: 500 });
  }
}

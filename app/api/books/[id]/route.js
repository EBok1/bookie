import { supabase } from "../../../supabaseClient";

export async function GET(request, { params }) {
  const { id } = await params;
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ data: [] });
  }
  try {
    const { data, error } = await supabase.from("books").select().eq("id", id);
    const book = data && data.length > 0 ? data[0] : null;

    console.log("✅ Get books result", ":", { data, error });
    return Response.json({ data: book });
  } catch (err) {
    console.error("❌ Get books error:", err);
    return Response.json({ data: [] });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const updateData = await request.json();

  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ data: [] });
  }

  try {
    const { data, error } = await supabase
      .from("books")
      .update({
        title: updateData.title,
        author: updateData.author,
        isbn: updateData.isbn,
        genre: updateData.genre,
        description: updateData.description,
        publishedYear: updateData.publishedYear,
        language: updateData.language,
      })
      .eq("id", id);
    console.log("✅ Update book", id, ":", { data, error });
    return Response.json({ data: data || [] });
  } catch (err) {
    console.error("❌ Update book error:", err);
    return Response.json({ data: [] });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ data: [] });
  }

  try {
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .delete()
      .eq("book_id", id);
    console.log("Deleted comments for book", id);

    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    console.log("✅ Delete book", id);
    return Response.json({ data: bookData || [] });
  } catch (err) {
    console.error("❌ Delete book error:", err);
    return Response.json({ data: [] });
  }
}

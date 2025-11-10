import { supabase } from "../../supabaseClient";

export async function GET(request: Request) {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ data: [] });
  }

  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    let query = supabase.from("comments").select();

    if (bookId) {
      query = query.eq("book_id", bookId);
    }

    const { data } = await query;

    return Response.json({ data: data || [] });
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return Response.json({ data: [] });
  }
}

export async function POST(request: Request) {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json(
      {
        data: null,
        error: { message: "Database connection not available." },
      },
      { status: 500 }
    );
  }

  try {
    const reviewData = await request.json();

    const { data, error } = await supabase
      .from("comments")
      .insert([reviewData])
      .select();

    if (error) {
      return Response.json({ data: null, error }, { status: 400 });
    }

    return Response.json({ data, error: null }, { status: 201 });
  } catch (err) {
    console.error("❌ Add review error:", err);
    return Response.json(
      { data: null, error: { message: err instanceof Error ? err.message : "Unknown error" } },
      { status: 500 }
    );
  }
}

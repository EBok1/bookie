import { supabase } from "../../supabaseClient";

export async function GET(request) {
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

    const { data, error } = await query;

    console.log("✅ Get comments result", ":", { data, error });
    return Response.json({ data: data || [] });
  } catch (err) {
    console.error("❌ Get comments error:", err);
    return Response.json({ data: [] });
  }
}

export async function POST(request) {
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

    console.log("✅ Add review result:", { data, error });

    if (error) {
      return Response.json({ data: null, error }, { status: 400 });
    }

    return Response.json({ data, error: null }, { status: 201 });
  } catch (err) {
    console.error("❌ Add review error:", err);
    return Response.json(
      { data: null, error: { message: err.message } },
      { status: 500 }
    );
  }
}

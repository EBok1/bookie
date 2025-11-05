import { supabase } from "../../supabaseClient";

export async function GET() {
  if (!supabase) {
    console.error(
      "❌ Supabase client not initialized. Check your environment variables."
    );
    return Response.json({ data: [] });
  }
  try {
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("❌ Get books query error:", error);
    }
    return Response.json({ data });
  } catch (err) {
    console.error("❌ Get books error:", err);
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
    const bookData = await request.json();

    const { data, error } = await supabase
      .from("books")
      .insert([bookData])
      .select();

    if (error) {
      console.error("❌ Add book error:", error);
      return Response.json({ data: null, error }, { status: 400 });
    }

    return Response.json({ data, error: null }, { status: 201 });
  } catch (err) {
    console.error("❌ Add book error:", err);
    return Response.json(
      { data: null, error: { message: err.message } },
      { status: 500 }
    );
  }
}

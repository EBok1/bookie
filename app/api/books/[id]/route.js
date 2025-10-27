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

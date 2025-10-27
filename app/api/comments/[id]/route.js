import { supabase } from "../../../supabaseClient";

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
          .from("comments")
          .update({
            reviewer: updateData.reviewer,
            comment: updateData.comment,
            rating: updateData.rating,
          })
          .eq("id", id);
        console.log("✅ Update comments result for book", id, ":", { data, error });
        return Response.json({ data: data || [] });
      } catch (err) {
        console.error("❌ Update comments error:", err);
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
        const { data, error } = await supabase
          .from("comments")
          .delete()
          .eq("id", id);
        console.log("✅ Delete comments result for book", id, ":", { data, error });
        return Response.json({ data: data || [] });
      } catch (err) {
        console.error("❌ Delete comments error:", err);
        return Response.json({ data: [] });
      }
}
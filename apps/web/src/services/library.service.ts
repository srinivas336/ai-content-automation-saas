import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getUserContent(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("content")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Library Error:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteContent(id: string) {
  const { error } = await supabaseAdmin
    .from("content")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Error:", error);
    throw new Error(error.message);
  }
}
export async function updateContent(id: string, content: string) {
  const { error } = await supabaseAdmin
    .from("content")
    .update({ content })
    .eq("id", id);

  if (error) {
    console.error("Update Error:", error);
    throw new Error(error.message);
  }
}
import { supabaseAdmin } from "@/lib/supabase-admin";

type SaveContentParams = {
  userId: string;
  platform: string;
  topic: string;
  tone: string;
  content: string;
};

export async function saveContent({
  userId,
  platform,
  topic,
  tone,
  content,
}: SaveContentParams) {
  const { data, error } = await supabaseAdmin
    .from("content")
    .insert({
      user_id: userId,
      platform,
      topic,
      tone,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase Save Error:", error);
    throw new Error(error.message);
  }

  return data;
}
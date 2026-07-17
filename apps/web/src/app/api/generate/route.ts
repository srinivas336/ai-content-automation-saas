import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/services/ai.service";
import { saveContent } from "@/services/database.service";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 401 }
      );
    }

    const { platform, topic, tone } = await req.json();

    if (!platform || !topic || !tone) {
      return NextResponse.json(
        {
          error: "Platform, topic and tone are required.",
        },
        {
          status: 400,
        }
      );
    }

    const text = await generateContent(
      platform,
      topic,
      tone
    );

    await saveContent({
      userId: user.id,
      platform,
      topic,
      tone,
      content: text,
    });

    return NextResponse.json({
      text,
    });
  } catch (error: any) {
    console.error("Generate API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to generate content.",
      },
      {
        status: 500,
      }
    );
  }
}
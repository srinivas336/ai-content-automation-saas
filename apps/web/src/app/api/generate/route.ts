import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/services/ai.service";

export async function POST(req: NextRequest) {
  try {
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

    return NextResponse.json({
      text,
    });
  } catch (error: any) {
    console.error("Generate API Error:", error);

    let message = "Failed to generate content.";

    if (error?.status === 503) {
      message =
        "All AI models are currently busy. Please try again in a minute.";
    }

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: error?.status || 500,
      }
    );
  }
}
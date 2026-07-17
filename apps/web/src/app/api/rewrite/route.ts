import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/services/ai.service";

export async function POST(req: NextRequest) {
  try {
    const { content, action } = await req.json();

    if (!content || !action) {
      return NextResponse.json(
        {
          error: "Content and action are required.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are an expert social media content editor.

Task:
${action}

Original content:
${content}

Rules:
- Return only the improved content.
- Do not explain anything.
- Keep the same meaning.
- Make it high quality.
`;

    const result = await generateContent(
      "Universal",
      prompt,
      "Professional"
    );

    return NextResponse.json({
      text: result,
    });

  } catch (error: any) {
    console.error("Rewrite API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Rewrite failed.",
      },
      {
        status: 500,
      }
    );
  }
}
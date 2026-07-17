import { generateContent } from "@/services/ai.service";

export async function rewriteContent(
  content: string,
  action: string
) {
  const prompt = `
You are a professional content editor.

Action:
${action}

Content:
${content}

Instructions:
- Return only the final rewritten content.
- Do not add explanations.
- Keep it engaging and useful.
`;

  const result = await generateContent(
    "Universal",
    prompt,
    "Professional"
  );

  return result;
}
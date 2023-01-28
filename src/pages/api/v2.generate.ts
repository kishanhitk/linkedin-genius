import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAPIStream";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { tone, contentInput } = (await req.json()) as {
    tone: string;
    contentInput: string;
  };

  if (!tone || !contentInput)
    return new Response("Invalid input", { status: 400 });

  const prompt = `Write a long LinkedIn post. Keep the tone of the post to be ${tone}. Use proper hashtags. Add a line to request users to follow for more such posts. Context: ${contentInput}.`;
  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

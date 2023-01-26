import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const OPENAPI_API_KEY = process.env.OPENAI_API_KEY;
  const { tone, contentInput } = JSON.parse(req.body);
  const body = {
    model: "text-davinci-003",
    prompt: `Write a long LinkedIn post. Keep the tone of the post to be ${tone}. Use proper hashtags. Add a line to request users to follow for more such posts. Context: ${contentInput}`,
    temperature: 0.7,
    max_tokens: 600,
  };

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAPI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  const text = data.choices[0].text;
  res.status(200).json({ text });
}

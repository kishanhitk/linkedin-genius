// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const OPENAPI_API_KEY = process.env.OPENAI_API_KEY;
  const { name, state, isCse, companyName, role } = JSON.parse(req.body);
  const body = {
    model: "text-davinci-003",
    prompt: `I am ${name}. I am from a small town of ${state}, studied from government school. ${
      isCse ? "I don't have a Computer Science degree" : ""
    }. But I studied hard and got a very good ${role} role at ${companyName}. I am very happy, and thankful to my friends and family. Write a long emotional LinkedIn post about this achievement, make it sound like a very big achievement. Write it so that it sounds like a story, and is interesting to read. Add proper hashtags. Start with a clickbait type line.`,
    temperature: 0.7,
    max_tokens: 600,
  };
  const fakeData =
    "It has been an incredible journey for me. I am Kishan Kumar, a small-town boy from Bihar, who did not have the luxury of having a Computer Science degree. But I never let my background be my limit. I worked hard, studied and kept going, despite all the odds. And today, I am proud to announce that I have been offered a Full-Stack Engineer role at Quinence - a leading IT firm. I am amazed and humbled by this incredible opportunity. This achievement has been possible only because of the unwavering support of my friends and family. I can't thank them enough for believing in me and encouraging me to never give up. I am now looking forward to this new challenge in my life. This is a dream-come-true moment for me and I am sure that with hard work and dedication, I will be able to make the most of it. #Dreams #Achievement #Quinence";

  //   const response = await fetch("https://api.openai.com/v1/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${OPENAPI_API_KEY}`,
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const data = await response.json();
  //   const text = data.choices[0].text;
  const text = fakeData;
  console.log(text);
  res.status(200).json({ text });
}

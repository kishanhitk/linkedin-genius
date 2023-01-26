"use client";

import { FormEvent, useState } from "react";
export const Generator = () => {
  const [contentInput, setContentInput] = useState("");
  const [tone, setTone] = useState("Funny");
  const [resultText, setResultText] = useState(`
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis sapiente ea unde ducimus cupiditate est iste, cum beatae possimus vitae quos ullam amet tempora repellendus quibusdam fugiat ad numquam illo hic dolorum natus reprehenderit aut odio! Rem tempora sunt quaerat aspernatur, deleniti aliquid modi iusto! Est iusto asperiores perspiciatis? Doloremque voluptatum nobis sunt sint voluptatem, est earum accusantium illum nihil laborum distinctio quam vitae obcaecati quos voluptatibus esse sequi minima aliquid consectetur deleniti quas labore! Error quo repellat esse quae quibusdam distinctio assumenda! Consequatur expedita sed natus omnis quas tempora voluptates iste quam ullam. Sint, cupiditate! Natus officia tenetur saepe.

  `);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      contentInput,
      tone,
    };
    // Send the data to the server
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Get the response from the server
    const result = await response.json();
    console.log(result);
    setResultText(result.text);
  };
  return (
    <div className="mx-auto h-screen max-w-3xl">
      <form
        className="flex h-full flex-col justify-center gap-y-4  px-24"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="contentInput"
          className=" text-lg font-medium text-gray-900"
        >
          What did you achieve today?
        </label>
        <textarea
          placeholder="I got a job at Google, or I graduated from Harvard with a degree in Computer Science."
          className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-lg "
          name="contentInput"
          value={contentInput}
          required
          onChange={(e) => setContentInput(e.target.value)}
        />

        <div>
          <label htmlFor="tone" className=" text-lg font-medium text-gray-900">
            How do you want to sound it like?
          </label>
          <select
            onChange={(e) => setTone(e.target.value)}
            value={tone}
            id="tone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          >
            <option value="Funny">Funny</option>
            <option value="Excited">Excited</option>
            <option value="Cringe">Cringe</option>
            <option value="Informative">Informative</option>
          </select>
        </div>

        <button
          className="rounded-lg bg-black px-4 py-3 text-xl font-semibold text-white"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="px-24 py-10 text-black">{resultText}</div>
    </div>
  );
};
export default Generator;

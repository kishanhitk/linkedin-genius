"use client";

import { FormEvent, useRef, useState } from "react";
export const Generator = () => {
  const [contentInput, setContentInput] = useState("");
  const [tone, setTone] = useState("Motivational");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const resultTextRef = useRef<HTMLDivElement>(null);
  const tones = [
    "Funny",
    "Serious",
    "Informative",
    "Clever",
    "Inspiring",
    "Big Achievement",
    "Motivational",
  ];
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      contentInput,
      tone,
    };
    setIsLoading(true);
    // Send the data to the server
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Get the response from the server
    const result = await response.json();
    setResultText(result.text);
    setIsLoading(false);
    resultTextRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mx-auto mt-20 max-w-3xl px-12">
      <div className="flex h-full flex-col justify-center">
        <h2 className="text-center text-2xl">LinkedIn Genius</h2>
        <h3 className="my-10 text-center text-lg font-light">
          Unlock the power of AI to showcase your achievements on LinkedIn with
          <span className="px-1 font-normal  underline decoration-blue-300 underline-offset-4">
            LinkedIn Genius
          </span>
        </h3>
        <form
          className=" flex flex-col justify-center gap-y-4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="contentInput"
            className=" text-md font-medium text-gray-900"
          >
            What did you achieve today?
          </label>
          <textarea
            placeholder="I got a job at Google, or I graduated from Harvard with a degree in Computer Science."
            className="text-md rounded-md border border-gray-300 bg-gray-50 px-4 py-2 "
            name="contentInput"
            value={contentInput}
            rows={5}
            required
            onChange={(e) => setContentInput(e.target.value)}
          />

          <div>
            <label
              htmlFor="tone"
              className=" text-md font-medium text-gray-900"
            >
              How would you like to sound it like?
            </label>
            <select
              onChange={(e) => setTone(e.target.value)}
              value={tone}
              id="tone"
              className="text-md block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={isLoading}
            className={`flex h-12 items-center justify-center  rounded-md px-4 text-xl font-semibold text-white ${
              isLoading ? "bg-black/80" : "bg-black"
            }`}
            type="submit"
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                ></circle>
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  className="opacity-75"
                ></path>
              </svg>
            ) : (
              "Generate"
            )}
          </button>
        </form>

        {resultText && (
          <div
            ref={resultTextRef}
            className="relative mt-5 mb-20 select-all rounded-lg border bg-gray-50 p-5  text-black"
          >
            {resultText}
            {/* TODO: Not working. Reason: Permisson may not be present always. */}
            <button
              onClick={async () => {
                await navigator?.clipboard?.writeText(resultText);
              }}
            >
              <svg
                className="absolute top-2 right-2"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-4v4a2 2 0 01-2 2H2a2 2 0 01-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 012 2v4h4V2H8v4zM2 8v10h10V8H2z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Generator;

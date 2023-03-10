"use client";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Hero } from "./Hero";
export const Generator = () => {
  const [contentInput, setContentInput] = useState("");
  const [tone, setTone] = useState("Motivational");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const afterResultTextRef = useRef<HTMLDivElement>(null);
  const tones = [
    "Funny",
    "Serious",
    "Informative",
    "Clever",
    "Inspiring",
    "Big Achievement",
    "Motivational",
    "Emotional",
  ];
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const input = {
      contentInput,
      tone,
    };
    setIsLoading(true);
    try {
      // Send the data to the server
      const response = await fetch("/api/v2.generate", {
        method: "POST",
        body: JSON.stringify(input),
      });

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }
      setResultText("");

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResultText((prev) => prev + chunkValue);
        afterResultTextRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
      setError(
        "It seems the OpenAI server is overloaded. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mx-auto mt-20 max-w-3xl px-12 pb-20">
      <div className="flex h-full flex-col justify-center">
        <Hero />
        <form className="flex flex-col justify-center " onSubmit={handleSubmit}>
          <label
            htmlFor="contentInput"
            className=" text-md text-gray-902 mb-2 font-medium"
          >
            What did you achieve today?
          </label>
          <textarea
            placeholder="I got a job at Google, or I graduated from Harvard with a degree in Computer Science."
            className="text-md rounded-md border border-gray-300 bg-gray-50 px-4 py-2 "
            name="contentInput"
            value={contentInput}
            rows={4}
            required
            onChange={(e) => setContentInput(e.target.value)}
          />

          <label
            htmlFor="tone"
            className="text-md my-3 mb-2  font-medium text-gray-900"
          >
            How would you like to sound it like?
          </label>
          <select
            onChange={(e) => setTone(e.target.value)}
            value={tone}
            id="tone"
            className="text-md  block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          >
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>

          <button
            disabled={isLoading}
            className={`mt-6 flex h-12 items-center justify-center  rounded-md px-4 text-xl font-semibold text-white ${
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

        {error && <div className="mt-5 text-center text-red-500">{error}</div>}
        {resultText && (
          <div className="relative mt-5 mb-20 select-all rounded-lg border bg-gray-50 p-5  text-black">
            {resultText}
            {/* TODO: Not working. Reason: Permisson may not be present always. */}
            <button
              onClick={async () => {
                try {
                  await navigator?.clipboard?.writeText(resultText);
                  toast.success("Copied to clipboard!");
                } catch (error) {
                  toast.error("Failed to copy to clipboard!");
                }
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
        <div ref={afterResultTextRef}></div>
      </div>
    </div>
  );
};
export default Generator;

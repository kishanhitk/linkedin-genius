"use client";

import { useState } from "react";

export const Generator = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [isCse, setYes] = useState(true);
  const [resultText, setResultText] = useState("");
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submitted");
          // Console .log the form data
          console.log({ name, state, companyName, role, isCse });
          const data = {
            name,
            state,
            companyName,
            role,
            isCse,
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
          // Reset the form
          setName("");
          setState("");
          setCompanyName("");
          setRole("");
          setYes(true);
        }}
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="checkbox"
          name="yes"
          value={isCse.toString()}
          onChange={(e) => setYes(Boolean(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
      <div
        style={{
          color: "white",
        }}
      >
        {resultText}
      </div>
    </>
  );
};
export default Generator;

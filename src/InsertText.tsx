import React from "react";
import { useState } from "react";

export default function InsertText(props: {
  loadTextDictionary: (text: String) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="InsertText">
      <textarea
        value={text}
        rows={20}
        cols={50}
        onChange={(e: React.SyntheticEvent) => {
          setText((e.target as HTMLTextAreaElement).value);
        }}
      />
      <br />
      <button
        onClick={() => {
          props.loadTextDictionary(text);
        }}
      >
        Load
      </button>
    </div>
  );
}

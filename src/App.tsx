import React, { useState } from "react";
import "./App.css";

interface IInputChunk {
  type: string;
  value: string;
}

function App() {
  const REG = /({{.*?}})/g;
  const [value, setValue] = useState("");
  const [inputChunks, setInputChunks] = useState<IInputChunk[]>([]);

  const onInput = (event: React.SyntheticEvent) => {
    const inputValue = (event.target as HTMLInputElement).value;

    /** process your input */
    const chunks = inputValue.split(REG).map((str) => {
      if (str.match(REG)) {
        return {
          type: "var",
          value: str,
        };
      }

      return {
        type: "common",
        value: str,
      };
    });

    setInputChunks(chunks);
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className="w-[600px] h-[500px] flex items-center justify-center">
      <div className="relative">
        <input
          value={value}
          onInput={(event) => onInput(event)}
          className="relative px-1 w-56 text-transparent bg-transparent border-[1px] border-solid rounded-md border-gray-700 caret-black"
          type="text"
        />
        <div className="absolute text-gray-950 top-0 left-[5px]">
          {inputChunks.map((chunk, index) => {
            if (chunk.type === "var")
              return (
                <span key={index} className="py-[1px] bg-sky-300 rounded-md">
                  {chunk.value}
                </span>
              );
            return <span key={index}>{chunk.value}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

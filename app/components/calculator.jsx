"use client";
import { useState } from "react";

export default function CalculatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        const sanitized = input
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100");
        setResult(eval(sanitized));
      } catch {
        setResult("Error");
      }
    } else if (value === "√") {
      try {
        const num = result || input;
        if (num) {
          const number = eval(num.replace(/×/g, "*").replace(/÷/g, "/"));
          setResult(Math.sqrt(number));
        }
      } catch {
        setResult("Error");
      }
    } else if (value === "1/x") {
      try {
        const num = result || input;
        if (num) {
          const number = eval(num.replace(/×/g, "*").replace(/÷/g, "/"));
          setResult(1 / number);
        }
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ["1/x", "%", "√", "AC"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "+", "="],
  ];

  return (
    <div className="flex w-[400px] justify-center items-center">
      <div className="bg-pink-200 p-5 rounded-3xl shadow-xl w-[48vw]">
        {/* Display */}
        <div className="bg-pink-300 text-black p-4 rounded-xl text-right mb-4">
          <p className="text-lg font-medium">{input || "0"}</p>
          <p className="text-2xl font-bold">{result ? `= ${result}` : ""}</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              className={`${
                ["%", "÷", "×", "-", "=", "√", "1/x,", "AC"].includes(btn)
                  ? "bg-linear-to-b from-amber-200 to-amber-400"
                  : btn === "AC"
                  ? "bg-linear-to-b from-rose-300 to-pink-500"
                  : "bg-linear-to-b from-pink-300 to-pink-500"
              } rounded-full text-black font-semibold text-lg shadow-md py-3`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

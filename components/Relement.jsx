import { useState } from "react";

export function Relement({ iname, inameLabel, fcol, istate, istatemethod }) {
  let [rbg, setrbg] = useState(-1);
  return (
    <div className={`m-2 flex ${fcol ? "flex-col" : "flex-row"}`}>
      <div className={`text-[0.9rem] m-1`}>
        <label htmlFor={iname} className="text-gray-700">
          {inameLabel}
        </label>
      </div>
      <div
        className={`mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none 
      focus:ring-2 focus:ring-blue-500 shadow-lg shadow-black/35 ${
        rbg == 0 ? "bg-amber-200/60" : ""
      }`}
      >
        <input
          className="cursor-pointer"
          type="radio"
          name={iname}
          value={0}
          onChange={(e) => {
            istatemethod(e.target.value);
            setrbg(0);
          }}
        />
        <span className="p-2 cursor-pointer">Repayment</span>
      </div>
      <div
        className={`mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none 
      focus:ring-2 focus:ring-blue-500 shadow-lg shadow-black/35 ${
        rbg == 1 ? "bg-amber-200/60" : ""
      } `}
      >
        <input
          className="cursor-pointer"
          type="radio"
          name={iname}
          value={1}
          onChange={(e) => {
            istatemethod(e.target.value);
            setrbg(1);
          }}
        />
        <span className="p-2 cursor-pointer">Interest Only</span>
      </div>
    </div>
  );
}

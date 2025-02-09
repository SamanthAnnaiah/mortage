/**This React element has the following two main items
 * The heading for the element
 * And the input element for the form
 */

import { useContext, useEffect, useState } from "react";
import { MortContext } from "../contexts/MortProvider";

export function Inpelement({
  iname,
  inameLabel,
  fcol,
  sname,
  istate,
  istatemethod,
  ifocus = false,
  inpmin = "0",
  inpmax = "100",
}) {
  useEffect(() => {
    if (ifocus) {
      document.querySelector(`input[name=${iname}]`).focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [ierror, setierror] = useState(false);
  let { edispatch } = useContext(MortContext);

  return (
    <div className={`m-2 flex ${fcol ? "flex-col" : "flex-row"}`}>
      <div className={`text-[0.9rem] m-1`}>
        <label htmlFor={iname} className="text-gray-700">
          {inameLabel}
        </label>
      </div>
      <div className={`m-1 flex items-center`}>
        <span
          className="p-2 border border-gray-300 rounded-md inline
          shadow-lg shadow-black/35 bg-sky-200/40"
        >
          {sname}
        </span>
        <input
          type="number"
          min={inpmin}
          max={inpmax}
          name={iname}
          id={iname}
          value={istate}
          onChange={(e) => {
            if (
              Number(e.target.value) < Number(inpmin) ||
              Number(e.target.value) > Number(inpmax) ||
              e.target.value.indexOf("-") != -1 ||
              e.target.value == "" ||
              e.target.value == " " ||
              e.target.value == "0"
            ) {
              setierror(true);
              edispatch({ type: 0 });
            } else {
              setierror(false);
              edispatch({ type: -1 });
            }
            istatemethod(e.target.value);
          }}
          className={`w-full p-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-black/35
          ${ierror ? "bg-red-500" : ""}`}
        />
      </div>
    </div>
  );
}

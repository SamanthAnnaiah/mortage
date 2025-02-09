/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useState } from "react";
import PropTypes from "prop-types";

export let MortContext = createContext();

export function MortProvider({ children }) {
  const [mortgage, setMortgage] = useState(1000);
  const [interest, setInterest] = useState(1);
  const [years, setYears] = useState(1);
  const [mortgagetype, setmortgagetype] = useState(-1);

  const updateMortgage = (newMortgage) => {
    setMortgage(newMortgage);
  };

  const updateInterest = (newInterest) => {
    setInterest(newInterest);
  };

  const updateYears = (newYears) => {
    setYears(newYears);
  };

  const updatemortgagetype = (newMortgageType) => {
    setmortgagetype(newMortgageType);
  };

  let emessages = [
    "Please enter a valid mortgage amount",
    "Please enter a valid interest rate",
    "Please enter a valid number of years",
    "Years must be greater than 1",
  ];

  let initmort = {
    merror: -1,
    mdata: " ",
  };

  let [emes, edispatch] = useReducer(emanager, initmort);
  function emanager(state, action) {
    let { type } = action;
    switch (type) {
      case -1:
        return { ...state, mdata: " ", merror: -1 };
      case 0:
        return { ...state, mdata: emessages[0], merror: 1 };
      case 1:
        return { ...state, mdata: emessages[1], merror: 1 };
      case 2:
        return { ...state, mdata: emessages[2], merror: 1 };
      default:
        return state;
    }
  }

  return (
    <MortContext.Provider
      value={{
        mortgage,
        interest,
        years,
        mortgagetype,
        updateMortgage,
        updateInterest,
        updateYears,
        updatemortgagetype,
        edispatch,
        emes,
      }}
    >
      {children}
    </MortContext.Provider>
  );
}

MortProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

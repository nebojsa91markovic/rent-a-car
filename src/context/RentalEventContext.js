import React, { createContext, useReducer } from "react";
import { RentalEventReducer } from "../reducers/RentalEventReducer";

export const RentalEventContext = createContext();

const RentalEventContextProvider = (props) => {
  const [rentalEvent, dispatch] = useReducer(RentalEventReducer, []);

  return (
    <RentalEventContext.Provider value={{ rentalEvent, dispatch }}>
      {props.children}
    </RentalEventContext.Provider>
  );
};

export default RentalEventContextProvider;

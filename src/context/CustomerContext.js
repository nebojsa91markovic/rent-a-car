import React, { createContext, useReducer } from "react";
import { CustomerReducer } from "../reducers/CustomerReducer";

export const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const [customers, dispatch] = useReducer(CustomerReducer, []);

  return (
    <CustomerContext.Provider value={{ customers, dispatch }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;

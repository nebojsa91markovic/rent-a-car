import React, { createContext, useReducer } from "react";
import { VehicleReducer } from "../reducers/VehicleReducer";

export const VehicleContext = createContext();

const VehicleContextProvider = (props) => {
  const [vehicles, dispatch] = useReducer(VehicleReducer, []);

  return (
    <VehicleContext.Provider value={{ vehicles, dispatch }}>
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleContextProvider;

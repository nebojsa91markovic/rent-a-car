import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import FilterVehicles from "./components/FilterVehicles/FilterVehicles";
import FilterCustomers from "./components/FilterCustomers/FilterCustomers";
import FilterRentEvents from "./components/FilterRentEvents/FilterRentEvents";

import CustomerContextProvider from "./context/CustomerContext";
import VehicleContextProvider from "./context/VehicleContext";
import RentalEventContextProvider from "./context/RentalEventContext";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Vehicles");
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <div className={isLightTheme ? "App lightTheme" : "App darkTheme"}>
      <VehicleContextProvider>
        <CustomerContextProvider>
          <RentalEventContextProvider>
            <NavBar
              isLightTheme={isLightTheme}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setIsLightTheme={setIsLightTheme}
            />
            {currentPage === "Vehicles" ? (
              <FilterVehicles isLightTheme={isLightTheme} />
            ) : currentPage === "Customers" ? (
              <FilterCustomers isLightTheme={isLightTheme} />
            ) : (
              <FilterRentEvents isLightTheme={isLightTheme} />
            )}
          </RentalEventContextProvider>
        </CustomerContextProvider>
      </VehicleContextProvider>
    </div>
  );
};

export default App;

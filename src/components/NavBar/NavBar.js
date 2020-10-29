import React, { useContext, useEffect } from "react";
import AddCustomer from "../AddCustomer/AddCustomer";
import AddVehicle from "../AddVehicle/AddVehicle";
import AddRentalEvent from "../AddRentalEvent/AddRentalEvent";
import { CustomerContext } from "../../context/CustomerContext";
import CustomersCollection from "../../collections/CustomersCollection";
import "./NavBar.css";

const NavBar = ({ isLightTheme, setCurrentPage, setIsLightTheme }) => {
  const { customers, dispatch } = useContext(CustomerContext);

  const getAllCustomers = async () => {
    let allCustomers = [];
    CustomersCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allCustomers.push(doc.data());
      });
      dispatch({ type: "ALL_CUSTOMERS", customer: allCustomers });
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div
      id="nav-wrapper"
      className={isLightTheme ? "navbar lightThemeUI" : "navbar darkThemeUI"}
    >
      <div className="nav-title">
        <h1>Rent a Car</h1>
        <button
          id="toogleTheme"
          className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
          onClick={() => setIsLightTheme(!isLightTheme)}
        >
          {isLightTheme ? "Dark " : "Light "}mode
        </button>

        <div className="buttonWrapper">
          <button
            className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
            onClick={() => setCurrentPage("Vehicles")}
          >
            Show Vehicles
          </button>

          <button
            className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
            onClick={() => setCurrentPage("Customers")}
          >
            Show Customers
          </button>

          <button
            className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
            onClick={() => setCurrentPage("RentEvents")}
          >
            Show Rent Events
          </button>
        </div>
      </div>
      <AddVehicle isLightTheme={isLightTheme} />
      <AddCustomer isLightTheme={isLightTheme} />
      <AddRentalEvent isLightTheme={isLightTheme} />
    </div>
  );
};

export default NavBar;

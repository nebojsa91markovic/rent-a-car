import React from "react";
import "./Customers.css";
import CustomerDetails from "../CustomerDetails/CustomerDetails";
import { v4 as uuidv4 } from "uuid";

const Customers = ({ isLightTheme, filteredCustomers }) => {
  return (
    <ul
      className={
        isLightTheme
          ? "customerDetails lightThemeUI"
          : "customerDetails darkThemeUI"
      }
    >
      {filteredCustomers.map((customer) => (
        <CustomerDetails
          key={uuidv4()}
          customer={customer}
          isLightTheme={isLightTheme}
        />
      ))}
    </ul>
  );
};

export default Customers;

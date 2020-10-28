import React, { useContext, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import Customers from "../Customers/Customers";

const FilterCustomers = ({ isLightTheme }) => {
  const { customers } = useContext(CustomerContext);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleSearchResults(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(searchValue);
  };

  const handleSearchResults = (word) => {
    let newArray = [];
    customers.map((customer) =>
      Object.values(customer).includes(word) ? newArray.push(customer) : ""
    );
  };

  const filteredCustomers = () => {
    if (searchValue === "") return customers;
    let newArray = [];
    customers.map((customer) =>
      Object.values(customer).includes(searchValue)
        ? newArray.push(customer)
        : ""
    );
    return newArray;
  };

  return (
    <div
      id="filters-wrapper"
      className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
    >
      <div id="showCustomers">
        <form className="search" onSubmit={handleSearch}>
          <input
            className="search-input"
            value={searchValue}
            placeholder="Search customers..."
            aria-label="Search"
            type="text"
            onChange={handleChange}
          />
          <button type="submit" value="SEARCH" className="search-button">
            <span>Search</span>
          </button>
        </form>
      </div>
      <Customers
        filteredCustomers={filteredCustomers()}
        isLightTheme={isLightTheme}
      />
    </div>
  );
};

export default FilterCustomers;

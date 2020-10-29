import React, { useContext, useState, useEffect } from "react";
import VehiclesCollection from "../../collections/VehiclesCollection";
import { VehicleContext } from "../../context/VehicleContext";
import Vehicles from "../Vehicles/Vehicles";
import "./FilterVehicles.css";
import { v4 as uuidv4 } from "uuid";

const FilterVehicles = ({ isLightTheme }) => {
  const { vehicles, dispatch } = useContext(VehicleContext);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const vehicleTypes = ["Economy", "Estate", "Luxury", "SUV", "Cargo"];

  const getAllVechiles = () => {
    let allVehicles = [];
    VehiclesCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allVehicles.push(doc.data());
      });
      dispatch({ type: "ALL_VEHICLES", vehicle: allVehicles });
    });
  };

  useEffect(() => {
    getAllVechiles();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleSearchResults();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(searchValue);
  };

  const handleSearchResults = () => {
    if (searchValue.trim("").length === 0) return vehicles;
    let newArray = [];
    vehicles.map((vehicle) => {
      for (const [key, value] of Object.entries(vehicle)) {
        if (
          value
            .toString()
            .startsWith(
              searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
            )
        ) {
          newArray.push(vehicle);
        }
      }
    });
    return newArray;
  };

  const filteredVehicles = () => {
    if (filter === "all") {
      return handleSearchResults();
    }
    return handleSearchResults().filter((vehicle) => vehicle.type === filter);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div
      id="filters-wrapper"
      className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
    >
      <div id="showVechicles">
        <div className="filterSelect">
          <label>Choose Vehicle type:</label>
          <select value={filter} id="vehicleTypeFilter" onChange={handleFilter}>
            <option key={uuidv4()} value="all">
              All
            </option>
            {vehicleTypes.map((type) => (
              <option key={uuidv4()} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <form className="search" onSubmit={handleSearch}>
          <input
            className="search-input"
            value={searchValue}
            placeholder="Search for favorite car"
            aria-label="Search"
            type="text"
            onChange={handleChange}
          />
          <button type="submit" value="SEARCH" className="search-button">
            <span>Search</span>
          </button>
        </form>
      </div>
      <Vehicles
        filteredVechicles={filteredVehicles()}
        isLightTheme={isLightTheme}
      />
    </div>
  );
};

export default FilterVehicles;

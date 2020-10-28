import React from "react";
import VehicleDetails from "../VehicleDetails/VehicleDetails";
import { v4 as uuidv4 } from "uuid";
import "./Vehicles.css";

const Vehicles = (props) => {
  const filteredVehicles = Object.values(props)[0];
  const isLightTheme = Object.values(props)[1];
  return (
    <table className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}>
      <tbody>
        <tr>
          <th>Image:</th>
          <th>Brand:</th>
          <th>Model:</th>
          <th>Costruction Year</th>
          <th>Fuel Type:</th>
          <th>Number of Seats:</th>
          <th>Type:</th>
          <th>Price:</th>
          <th>Remaining:</th>
          <th></th>
        </tr>
        {filteredVehicles.map((vehicle) => (
          <VehicleDetails key={uuidv4()} vehicle={vehicle} />
        ))}
      </tbody>
    </table>
  );
};

export default Vehicles;

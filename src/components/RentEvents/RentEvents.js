import React from "react";
import RentEventDetails from "../RentEventDetails/RentEventDetails";
import { v4 as uuidv4 } from "uuid";
import "./RentEvent.css";

const RentEvents = (props) => {
  const filteredRentEvents = Object.values(props)[0];
  const isLightTheme = Object.values(props)[1];
  return (
    <table
      id="rentEvents-wrapper"
      className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
    >
      <tbody>
        <tr>
          <th>Start Date:</th>
          <th>Start Time:</th>
          <th>End Date:</th>
          <th>End Time:</th>
          <th>Vehicle:</th>
          <th>Customer:</th>
        </tr>
        {filteredRentEvents.map((rentEvent, index) => (
          <RentEventDetails key={uuidv4()} rentEvent={rentEvent} />
        ))}
      </tbody>
    </table>
  );
};

export default RentEvents;

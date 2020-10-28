import React, { useContext, useState, useEffect } from "react";
import RentEventCollection from "../../collections/RentEventCollection";
import { RentalEventContext } from "../../context/RentalEventContext";
import RentEvents from "../RentEvents/RentEvents";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const FilterRentEvents = ({ isLightTheme }) => {
  const { rentalEvent, dispatch } = useContext(RentalEventContext);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let allRentEvents = [];
    RentEventCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allRentEvents.push(doc.data());
      });
      dispatch({ type: "ALL_RENTAL_EVENTS", rentalEvent: allRentEvents });
    });
  }, []);

  const filteredRentEvents = () => {
    const today = moment();
    const lastSixtyDays = moment().subtract(60, "days");

    if (filter === "all") {
      return rentalEvent;
    } else if (filter === "lastSixtyDays") {
      return rentalEvent.filter((rental) =>
        moment(rental.endDate).isBetween(lastSixtyDays, today)
      );
    } else if (filter === "scheduled") {
      return rentalEvent.filter((rental) =>
        moment(rental.startDate).isSameOrAfter(today)
      );
    }
    return rentalEvent.filter((vehicle) => vehicle.type === filter);
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
          <label>Choose filter:</label>
          <select
            value={filter}
            id="rentEventTypeFilter"
            onChange={handleFilter}
          >
            <option key={uuidv4()} value="all">
              All
            </option>
            <option key={uuidv4()} value="lastSixtyDays">
              Last Sixty Days
            </option>
            <option key={uuidv4()} value="scheduled">
              Scheduled
            </option>
          </select>
        </div>
      </div>

      <RentEvents
        filteredRentEvents={filteredRentEvents()}
        isLightTheme={isLightTheme}
      />
    </div>
  );
};

export default FilterRentEvents;

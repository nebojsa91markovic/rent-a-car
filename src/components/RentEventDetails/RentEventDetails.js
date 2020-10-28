import React from "react";

const RentEventDetails = ({ rentEvent }) => {
  return (
    <tr>
      <td>{rentEvent.startDate}</td>
      <td>{rentEvent.startTime}</td>
      <td>{rentEvent.endDate}</td>
      <td>{rentEvent.endTime}</td>
      <td>{rentEvent.vehicle}</td>
      <td>{rentEvent.customer}</td>
      <td>{rentEvent.pricePerDay}</td>
    </tr>
  );
};

export default RentEventDetails;

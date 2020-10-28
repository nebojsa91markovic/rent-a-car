import RentEventCollection from "../collections/RentEventCollection";
import VehiclesCollection from "../collections/VehiclesCollection";

export const RentalEventReducer = (state, action) => {
  switch (action.type) {
    case "ALL_RENTAL_EVENTS":
      return action.rentalEvent;
    case "ADD_RENTAL_EVENT":
      const {
        startDate,
        startTime,
        endDate,
        endTime,
        vehicle,
        customer,
        finalPrice,
        id,
      } = action.rentalEvent;
      let newRentEvent = {
        startDate,
        startTime,
        endDate,
        endTime,
        vehicle,
        customer,
        finalPrice: finalPrice,
        id: id,
      };
      RentEventCollection.add(newRentEvent);
      const { vehicleID, vehicleCount } = action;
      VehiclesCollection.doc(vehicleID).update({ count: vehicleCount - 1 });
      return [...state, newRentEvent];
    case "UPDATE_RENTAL_EVENT":
      let prevState = [...state];
      let newState = prevState.filter(
        (rentalEvent) => rentalEvent.id !== action.rentalEvent.id
      );
      let updRentalEvent = action.rentalEvent;
      let index = prevState.findIndex(
        (rentalEvent) => rentalEvent.id === action.rentalEvent.id
      );
      newState.splice(index, 0, updRentalEvent);
      return newState;

    default:
      return state;
  }
};

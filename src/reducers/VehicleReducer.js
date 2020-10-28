import VehiclesCollection from "../collections/VehiclesCollection";

export const VehicleReducer = (state, action) => {
  const { vehicle } = action;
  switch (action.type) {
    case "ALL_VEHICLES":
      return vehicle;
    case "ADD_VEHICLE":
      VehiclesCollection.doc(vehicle.id).set({ vehicle });
      return [...state, vehicle];
    case "UPDATE_VEHICLE":
      VehiclesCollection.doc(action.vehicle.id).update(action.vehicle);
      let prevState = [...state];
      let newState = prevState.filter(
        (vehicle) => vehicle.id !== action.vehicle.id
      );
      let updVehicle = action.vehicle;
      let index = prevState.findIndex(
        (vehicle) => vehicle.id === action.vehicle.id
      );
      newState.splice(index, 0, updVehicle);
      return newState;
    case "REMOVE_VEHICLE":
      VehiclesCollection.doc(action.vehicle.id).delete();
      return state.filter((vehicle) => vehicle.id !== action.vehicle.id);
    default:
      return state;
  }
};

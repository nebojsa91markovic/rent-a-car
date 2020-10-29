import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
// import './AddCustomer.css';
import { VehicleContext } from "../../context/VehicleContext";

import VehiclesCollection from "../../collections/VehiclesCollection";

const AddVehicle = ({ isLightTheme }) => {
  const { dispatch } = useContext(VehicleContext);
  let subtitle;
  const vehicleTypes = ["Economy", "Estate", "Luxury", "SUV", "Cargo"];
  const vehicleFuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
  useEffect(() => {
    Modal.setAppElement("#addVehiclesWrapper");
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [construstionYear, setConstructionYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [numberOfSeats, setNumberofSeats] = useState("");
  const [picture, setPicture] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [count, setCount] = useState("");
  const [type, setType] = useState("");

  function openModal() {
    setIsOpen(true);

    setBrand("");
    setModel("");
    setConstructionYear("");
    setFuelType("");
    setNumberofSeats("");
    setPicture("");
    setPricePerDay("");
    setCount("");
    setType("");
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = uuidv4();
    const newVehicle = {
      brand,
      model,
      construstionYear,
      fuelType,
      numberOfSeats,
      picture,
      pricePerDay,
      count,
      type,
      id,
    };

    for (const [key, value] of Object.entries(newVehicle)) {
      if (value.trim("").length === 0) {
        alert(`${key} is not insert.`);
        return;
      }
    }

    VehiclesCollection.doc(id).set(newVehicle);
    dispatch({
      type: "ADD_VEHICLE",
      vehicle: {
        brand: brand,
        model: model,
        construstionYear: construstionYear,
        fuelType: fuelType,
        numberOfSeats: numberOfSeats,
        picture: picture,
        pricePerDay: pricePerDay,
        count: count,
        type: type,
        id: id,
      },
    });

    setIsOpen(false);
  };

  const handleFuelSelect = (event) => {
    setFuelType(event.target.value);
  };

  const handleTypeSelect = (event) => {
    setType(event.target.value);
  };

  return (
    <div id="addVehiclesWrapper">
      <button
        className={isLightTheme ? "lightTheme" : "darkTheme"}
        onClick={openModal}
      >
        <span>+</span> Vehicle
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Insert New Vehicle
          </h2>
          <div className="inputRow">
            <label>Brand:</label>
            <input
              type="text"
              placeholder="Enter brand..."
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Model:</label>
            <input
              type="text"
              placeholder="Enter model..."
              value={model}
              onChange={(event) => setModel(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Construstion Year:</label>
            <input
              type="number"
              placeholder="Enter construstion year..."
              value={construstionYear}
              onChange={(event) => setConstructionYear(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Fuel Type:</label>
            <select
              defaultValue="fuelType"
              id="vehicleFuelType"
              onChange={handleFuelSelect}
            >
              <option value="fuelType" disabled>
                Select fuel type...
              </option>
              {vehicleFuelTypes.map((vehicleFuelType) => (
                <option key={uuidv4()} value={vehicleFuelType}>
                  {vehicleFuelType}
                </option>
              ))}
            </select>
          </div>
          <div className="inputRow">
            <label>Number of seats:</label>
            <input
              type="number"
              placeholder="Enter number of seats..."
              value={numberOfSeats}
              onChange={(event) => setNumberofSeats(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Picture link:</label>
            <input
              type="text"
              placeholder="Enter picture link..."
              value={picture}
              onChange={(event) => setPicture(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Price per Day:</label>
            <input
              type="number"
              placeholder="Enter price per day..."
              value={pricePerDay}
              onChange={(event) => setPricePerDay(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Number of cars:</label>
            <input
              type="number"
              placeholder="Enter number of cars..."
              value={count}
              onChange={(event) => setCount(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Type:</label>
            <select
              defaultValue="vehicleTypes"
              id="vehicleType"
              onChange={handleTypeSelect}
            >
              <option value="vehicleTypes" disabled>
                Select vehicle type...
              </option>
              {vehicleTypes.map((vehicleType) => (
                <option key={uuidv4()} value={vehicleType}>
                  {vehicleType}
                </option>
              ))}
            </select>
          </div>
          <input type="submit" value="Save" />
        </form>
      </Modal>
    </div>
  );
};

export default AddVehicle;

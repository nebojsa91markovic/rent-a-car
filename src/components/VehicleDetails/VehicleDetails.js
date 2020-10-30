import React, { useContext, useState, useEffect } from "react";
import { VehicleContext } from "../../context/VehicleContext";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";

const VehicleDetails = ({ vehicle }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgModalIsOpen, setImgModalIsOpen] = useState(false);

  const { dispatch } = useContext(VehicleContext);
  let subtitle;
  let imgFullSize;

  const [brand, setBrand] = useState(vehicle.brand);
  const [model, setModel] = useState(vehicle.model);
  const [construstionYear, setConstructionYear] = useState(
    vehicle.construstionYear
  );
  const [fuelType, setFuelType] = useState(vehicle.fuelType);
  const [numberOfSeats, setNumberofSeats] = useState(vehicle.numberOfSeats);
  const [picture, setPicture] = useState(vehicle.picture);
  const [pricePerDay, setPricePerDay] = useState(vehicle.pricePerDay);
  const [count, setCount] = useState(vehicle.count);
  const [type, setType] = useState(vehicle.type);
  const [id, setId] = useState(vehicle.id);

  const vehicleTypes = ["Economy", "Estate", "Luxury", "SUV", "Cargo"];
  const vehicleFuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

  const customStyle = {
    backgroundColor: "red",
  };

  useEffect(() => {
    setIsOpen(false);
    Modal.setAppElement("#addVehiclesWrapper");
  }, []);

  //Image Modal for bigger picture
  function openImgModal() {
    setImgModalIsOpen(true);
  }
  function afterOpenImgModal() {
    imgFullSize.setAttribute("style", "width: 80%; height: auto; ");
  }

  function closeImgModal() {
    setImgModalIsOpen(false);
  }

  //Modal for editing Vehicle Details
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);

    setBrand(vehicle.brand);
    setModel(vehicle.model);
    setConstructionYear(vehicle.construstionYear);
    setFuelType(vehicle.fuelType);
    setNumberofSeats(vehicle.numberOfSeats);
    setPicture(vehicle.picture);
    setPricePerDay(vehicle.pricePerDay);
    setCount(vehicle.count);
    setType(vehicle.type);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "UPDATE_VEHICLE",
      vehicle: {
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
      },
    });
    setIsOpen(false);
  };

  const editVehicle = (event) => {
    openModal(true);
    console.log(event.target);
  };

  const handleFuelSelect = (event) => {
    setFuelType(event.target.value);
  };

  const handleTypeSelect = (event) => {
    setType(event.target.value);
  };

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_VEHICLE", vehicle: { id } });
  };

  return (
    <tr onDoubleClick={(event) => editVehicle(event)}>
      {/* Modal for full size image */}
      <Modal
        id="imageModal"
        isOpen={imgModalIsOpen}
        onAfterOpen={afterOpenImgModal}
        onRequestClose={closeImgModal}
        contentLabel={vehicle.model}
      >
        <img
          ref={(_imgFullSize) => (imgFullSize = _imgFullSize)}
          src={vehicle.picture}
          alt={vehicle.modal}
        />
      </Modal>
      {/* Modal for editing vehicle */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Edit Vehicle Details"
      >
        <form onSubmit={handleSubmit}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Vehicle</h2>
          <button className="closeModalBtn" onClick={closeModal}>
            X
          </button>
          <div className="inputRow">
            <label>Brand:</label>
            <input
              type="text"
              placeholder="Enter brand..."
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Model:</label>
            <input
              type="text"
              placeholder="Enter model..."
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Construstion Year:</label>
            <input
              type="number"
              placeholder="Enter construstion year..."
              value={construstionYear}
              onChange={(event) => setConstructionYear(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Fuel Type:</label>
            <select
              value={fuelType}
              id="vehicleFuelType"
              onChange={handleFuelSelect}
              required
            >
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
            />
          </div>
          <div className="inputRow">
            <label>Picture link:</label>
            <input
              type="text"
              placeholder="Enter picture link..."
              value={picture}
              onChange={(event) => setPicture(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Price per Day:</label>
            <input
              type="number"
              placeholder="Enter price per day..."
              value={pricePerDay}
              onChange={(event) => setPricePerDay(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Number of cars:</label>
            <input
              type="number"
              placeholder="Enter number of cars..."
              value={count}
              onChange={(event) => setCount(event.target.value)}
            />
          </div>
          <div className="inputRow">
            <label>Type:</label>
            <select value={type} id="vehicleType" onChange={handleTypeSelect}>
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
      <td>
        <img src={vehicle.picture} alt={vehicle.model} onClick={openImgModal} />
      </td>
      <td>{vehicle.brand}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.construstionYear}</td>
      <td>{vehicle.fuelType}</td>
      <td>{vehicle.numberOfSeats}</td>
      <td>{vehicle.type}</td>
      <td>{vehicle.pricePerDay}</td>
      <td>{vehicle.count}</td>
      <td>
        <button
          onClick={() => {
            if (window.confirm("Do you wish to delete this vehicle")) {
              handleDelete(vehicle.id);
            }
          }}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default VehicleDetails;

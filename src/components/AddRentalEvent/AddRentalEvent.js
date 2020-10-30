import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { RentalEventContext } from "../../context/RentalEventContext";
import { CustomerContext } from "../../context/CustomerContext";
import { VehicleContext } from "../../context/VehicleContext";
import moment from "moment";

const AddRentalEvent = ({ isLightTheme }) => {
  const { rentalEvent, dispatch } = useContext(RentalEventContext);
  const { customers } = useContext(CustomerContext);
  const { vehicles } = useContext(VehicleContext);
  let subtitle;

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState("");
  const [vehicleID, setVehicleID] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState("");

  useEffect(() => {
    Modal.setAppElement("#addRentalEventsWrapper");
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);

    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setVehicle("");
    setCustomer("");
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (finalPrice === 0) {
      alert(
        "You probobaly didn't select something right! Please reselect again."
      );
      return;
    }

    if (finalPrice.trim("").length !== 0)
      dispatch({
        type: "ADD_RENTAL_EVENT",
        rentalEvent: {
          startDate,
          startTime,
          endDate,
          endTime,
          vehicle,
          customer,
          finalPrice: finalPrice,
          id: uuidv4(),
        },
        vehicleID: vehicleID,
        vehicleCount: vehicleCount,
      });

    setIsOpen(false);
  };

  const handleCurrentPrice = () => {
    //Checking if customer have more than 3 rents in last 60 days
    //to give 15% discount
    const today = moment();
    const lastSixtyDays = moment().subtract(60, "days");

    let rentDays = Math.abs(moment(startDate).diff(endDate, "days"));

    let lastSixtyDaysEvents = rentalEvent.filter((rental) =>
      moment(rental.endDate).isBetween(lastSixtyDays, today)
    );
    let customerCounter = [];
    lastSixtyDaysEvents.forEach((event) => {
      if (event.customer === customer) {
        customerCounter.push(event.customer);
      }
    });

    //Check for discount
    let currentPrice = price * rentDays;
    if (rentDays === 0) {
      setFinalPrice(price);
    } else {
      if (customerCounter.length > 3) {
        setDiscount(15);
        setFinalPrice(currentPrice * 0.85);
      } else {
        if (rentDays > 10) {
          setDiscount(10);
          setFinalPrice(currentPrice * 0.9);
        } else if (rentDays > 5) {
          setDiscount(7);
          setFinalPrice(currentPrice * 0.93);
        } else if (rentDays > 3) {
          setDiscount(3);
          setFinalPrice(currentPrice * 0.95);
        }
      }
    }
  };

  const setValues = (event, price, id, count) => {
    setVehicle(event.target.value);
    setPrice(price);
    setVehicleID(id);
    setVehicleCount(count);
  };

  const handleCustomerSelect = (event) => {
    setCustomer(event.target.value);
  };

  return (
    <div id="addRentalEventsWrapper">
      <button
        className={isLightTheme ? "lightTheme" : "darkTheme"}
        onClick={openModal}
      >
        <span>+</span> Rental Event
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit} onChange={handleCurrentPrice}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Insert New RentalEvent
          </h2>
          <button className="closeModalBtn" onClick={closeModal}>
            X
          </button>
          <div className="inputRow">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label htmlFor="vehicle">Choose a car:</label>

            <select id="vehicle" defaultValue="selectVehicle">
              <option value="selectVehicle" disabled>
                Select vehicle...
              </option>
              {vehicles.map((vehicle) =>
                vehicle.count > 0 ? (
                  <option
                    key={uuidv4()}
                    value={vehicle.model}
                    onClick={(event) =>
                      setValues(
                        event,
                        vehicle.pricePerDay,
                        vehicle.id,
                        vehicle.count
                      )
                    }
                  >
                    {vehicle.model}
                  </option>
                ) : (
                  <i></i>
                )
              )}
            </select>
          </div>
          <div className="inputRow">
            <label htmlFor="customer">Choose a Customer:</label>

            <select
              defaultValue="selectCustomer"
              id="customer"
              onChange={handleCustomerSelect}
            >
              <option value="selectCustomer" disabled>
                Select customer...
              </option>
              {customers.map((customer) => (
                <option key={uuidv4()} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputRow">
            <label htmlFor="price">
              Price:
              {discount > 0 ? <span id="discount">{discount}% off</span> : ""}
            </label>
            <input type="number" placeholder={finalPrice} disabled />
          </div>
          <input type="submit" value="Save" />
        </form>
      </Modal>
    </div>
  );
};

export default AddRentalEvent;

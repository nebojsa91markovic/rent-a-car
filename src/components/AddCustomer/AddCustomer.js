import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import "./AddCustomer.css";
import { CustomerContext } from "../../context/CustomerContext";

const AddCustomer = ({ isLightTheme }) => {
  const { dispatch } = useContext(CustomerContext);
  let subtitle;
  useEffect(() => {
    Modal.setAppElement("#addCustomersWrapper");
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function openModal() {
    setIsOpen(true);

    setName("");
    setEmail("");
    setPhone("");
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      name.trim("").length !== 0 ||
      email.trim("").length !== 0 ||
      phone.trim("").length !== 0
    ) {
      alert("Inputs can't be empty!");
      return;
    } else {
      let id = uuidv4();
      dispatch({ type: "ADD_CUSTOMER", customer: { name, email, phone, id } });

      setIsOpen(false);
    }
  };

  return (
    <div id="addCustomersWrapper">
      <button
        className={isLightTheme ? "lightTheme" : "darkTheme"}
        onClick={openModal}
      >
        <span>+</span> Customer
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Insert New Customer
            <span className="closeModalBtn" onClick={closeModal}>
              X
            </span>
          </h2>
          <div className="inputRow">
            <label>Full Name:</label>
            <input
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="inputRow">
            <label>Phone Number:</label>
            <input
              type="tel"
              placeholder="Enter phone number..."
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <input type="submit" value="Save" />
        </form>
      </Modal>
    </div>
  );
};

export default AddCustomer;

import React, { useContext, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { v4 as uuidv4 } from "uuid";
import "./CustomerDetails.css";

const CustomerDetails = ({ customer, isLightTheme }) => {
  const { dispatch } = useContext(CustomerContext);

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);

  const doneEdit = (event) => {
    if (event.keyCode === 13) {
      if (event.target.value.trim().lenght === 0) {
        return;
      }

      if (event.target.name === "name") {
        dispatch({
          type: "UPDATE_CUSTOMER",
          customer: {
            name,
            email: customer.email,
            phone: customer.phone,
            id: customer.id,
          },
        });
        setEditingName(false);
      } else if (event.target.name === "email") {
        dispatch({
          type: "UPDATE_CUSTOMER",
          customer: {
            name: customer.name,
            email,
            phone: customer.phone,
            id: customer.id,
          },
        });
        setEditingEmail(false);
      } else if (event.target.name === "phone") {
        dispatch({
          type: "UPDATE_CUSTOMER",
          customer: {
            name: customer.name,
            email: customer.email,
            phone,
            id: customer.id,
          },
        });
        setEditingPhone(false);
      }
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  return (
    <li key={uuidv4()}>
      <div className="customerValue">
        {!editingName && (
          <span onDoubleClick={() => setEditingName(true)}>{name}</span>
        )}
        {editingName && (
          <input
            type="text"
            name="name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={(event) => doneEdit(event)}
            onBlur={() => setEditingName(false)}
          />
        )}
      </div>
      <div className="customerValue">
        {!editingEmail && (
          <span onDoubleClick={() => setEditingEmail(true)}>{email}</span>
        )}
        {editingEmail && (
          <input
            type="email"
            name="email"
            autoFocus
            defaultValue={email}
            onChange={handleChange}
            onKeyUp={(event) => doneEdit(event)}
            onBlur={() => setEditingEmail(false)}
          />
        )}
      </div>
      <div className="customerValue">
        {!editingPhone && (
          <span onDoubleClick={() => setEditingPhone(true)}>{phone}</span>
        )}
        {editingPhone && (
          <input
            type="tel"
            name="phone"
            autoFocus
            defaultValue={phone}
            onChange={handleChange}
            onKeyUp={(event) => doneEdit(event)}
            onBlur={() => setEditingPhone(false)}
          />
        )}
      </div>
      <button
        className={isLightTheme ? "lightThemeUI" : "darkThemeUI"}
        onClick={() =>
          dispatch({ type: "REMOVE_CUSTOMER", customer: { id: customer.id } })
        }
      >
        DELETE
      </button>
    </li>
  );
};

export default CustomerDetails;

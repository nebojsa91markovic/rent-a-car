import CustomersCollection from "../collections/CustomersCollection";

export const CustomerReducer = (state, action) => {
  switch (action.type) {
    case "ALL_CUSTOMERS":
      return action.customer;
    case "ADD_CUSTOMER":
      const { name, email, phone, id } = action.customer;
      CustomersCollection.doc(id).set({ name, email, phone, id });
      return [...state, { name, email, phone, id }];
    case "UPDATE_CUSTOMER":
      CustomersCollection.doc(action.customer.id).update(action.customer);
      let prevState = [...state];
      let newState = prevState.filter(
        (customer) => customer.id !== action.customer.id
      );

      let updCustomer = action.customer;
      let index = prevState.findIndex(
        (customer) => customer.id === action.customer.id
      );
      newState.splice(index, 0, updCustomer);
      return newState;
    case "REMOVE_CUSTOMER":
      CustomersCollection.doc(action.customer.id).delete();
      return state.filter((customer) => customer.id !== action.customer.id);
    default:
      return state;
  }
};

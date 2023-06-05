import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems } = location.state;

  const calculateTotalPrice = (items) => {
    if (!items.length) return 0;
    return items.reduce(
      (total, item) => total + item.price * item.productinCart,
      0
    );
  };

  const totalPrice = calculateTotalPrice(cartItems);

  const [addresses, setAddresses] = useState([]);
  const [hideAddress, setHideAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState([]);

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      id: uuidv4(),
      name: e.target.elements.addressname.value,
      pinCode: e.target.elements.pincode.value,
      mobile: e.target.elements.mobileno.value,
      address: e.target.elements.address.value,
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    setHideAddress(true);

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  console.log(addresses);

  const handleSelectAddress = (id) => {
    const selectedAddress = addresses.find((address) => address.id === id);
    setSelectedAddress(selectedAddress);
  };

  return (
    <div className="home-container">
      <Header />

      <div className="main">
        <div className="main-heading">
          <h3>CHECKOUT</h3>
        </div>
        <div className="main-subheading">
          {cartItems.length ? (
            <div className="main-box">
              <div className="sub-box">
                <div className="address-card">
                  <Card>
                    <CardContent>
                      <Typography
                        align="center"
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        DELIVER TO
                      </Typography>
                      {addresses.map((address) => (
                        <div key={address.id}>
                          <input
                            type="radio"
                            name="selectedAddress"
                            value={address.id}
                            onChange={() => handleSelectAddress(address.id)}
                          />
                          <label htmlFor={address.id}>
                            <Typography variant="body1">
                              {address.name}
                            </Typography>
                            <Typography variant="body1">
                              {address.address}, {address.pinCode}
                            </Typography>
                            <Typography variant="body1">
                              Phone Number: {address.mobile}
                            </Typography>
                          </label>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Delete Address
                          </button>
                        </div>
                      ))}
                    </CardContent>

                    <button onClick={() => setHideAddress(false)}>
                      Add New Address
                    </button>
                    {!hideAddress && (
                      <form
                        onSubmit={handleAddAddress}
                        className="add-address-form"
                      >
                        <label htmlFor="addressname">Name</label>
                        <input
                          name="addressname"
                          id="addressname"
                          type="text"
                          placeholder="Enter name"
                          required={true}
                          pattern="^[a-zA-Z\s]+$"
                        />
                        <label htmlFor="pincode">Pin Code</label>
                        <input
                          name="pincode"
                          id="pincode"
                          type="number"
                          required={true}
                          min="100000"
                          max="999999"
                          placeholder="Enter pin code"
                        />
                        <label htmlFor="mobileno">Mobile</label>
                        <input
                          name="mobileno"
                          id="mobileno"
                          type="number"
                          required={true}
                          min="1000000000"
                          max="9999999999"
                          placeholder="Enter mobile number"
                        />

                        <label htmlFor="address">Address</label>
                        <textarea
                          name="address"
                          cols={5}
                          id="address"
                          type="text"
                          required={true}
                          placeholder="New Delivery Address Here"
                        ></textarea>
                        <button type="submit" className="btn-add-address">
                          Add Address
                        </button>
                        <button
                          type="button"
                          className="btn-cancel-address"
                          onClick={() => setHideAddress(true)}
                        >
                          Cancel
                        </button>
                      </form>
                    )}
                  </Card>
                </div>
                <div className="product-card">
                  <Card>
                    <CardContent>
                      <Typography
                        align="center"
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        ORDER DETAILS
                      </Typography>
                      <table>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th style={{ paddingLeft: "7em" }}>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id}>
                              <td>{item.title}</td>
                              <td
                                style={{
                                  paddingLeft: "6em",
                                  textAlign: "right",
                                }}
                              >
                                {item.productinCart}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Typography
                        align="center"
                        variant="h6"
                        sx={{ fontWeight: "bold", marginTop: 2 }}
                      >
                        PRICE DETAILS
                      </Typography>
                      <table>
                        <tbody>
                          <tr>
                            <td>Price ({cartItems.length} items)</td>
                            <td
                              style={{ paddingLeft: "6em", textAlign: "right" }}
                            >
                              ₹ {totalPrice.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Delivery Charges</td>
                            <td
                              style={{ paddingLeft: "6em", textAlign: "right" }}
                            >
                              FREE
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>Total Amount</td>
                            <td
                              style={{
                                paddingLeft: "6em",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                            >
                              ₹ {totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-box">
              <h2>No items in the cart</h2>
              <p>Please add items to the cart before proceeding to checkout.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

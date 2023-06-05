import React, { useContext, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";

const Header = ({ onSearch, setProductData, productData, getData}) => {
  const history = useHistory();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);
  const { wishlistItemCount } = useContext(WishlistContext); 

  const [searchTerm, setSearchTerm] = React.useState("");
  const [originalProductData, setOriginalProductData] = useState([]);

  useEffect(() => {
    // Store the original product data when the component mounts
    setOriginalProductData(productData);
  }, [productData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    onSearch("");
    // setProductData(productData)
    setProductData(originalProductData); // Reset product data to the original data
  };

  const handleLogout = () => {
    logout(); // Update the authentication status
    history.push("/login"); // Redirect to the login page
  };

  console.log("Cart Item Count:", cartItemCount);
  console.log("Wishlist Item Count:", wishlistItemCount);

  return (
    <Box className="header">
      <Box
        className="header-title"
        onClick={() => history.push("/", { from: "Header" })}
      >
        MyBookHub
      </Box>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="search"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleChange}
            size="small"
            InputLabelProps={{
              style: { color: "#212121", fontWeight: "bold" },
            }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSearchClear}
                >
                  Search
                </Button>
              ),
            }}
          />
        </form>

        {isAuthenticated ? (
          <>
            <NavLink to="/wishlist">
              <Button style={{ fontWeight: "bold", color: "red" }}>
                <FavoriteIcon /> ({wishlistItemCount})
              </Button>
            </NavLink>
            <NavLink to="/cart">
              <Button style={{ fontWeight: "bold", marginLeft: "-15px", color: "green" }}>
                <ShoppingCartIcon /> ({cartItemCount})
              </Button>
            </NavLink>
              <Button
              variant="outlined"
              style={{ textDecoration: "none", color: "darkblue", fontWeight: "bold" }}
              className="product-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Button
                variant="contained"
                style={{ textDecoration: "underline", color: "white", fontWeight: "bold" }}
                className="product-btn"
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
            </NavLink>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;

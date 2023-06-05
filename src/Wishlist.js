import React, { useContext } from "react";
import Header from "./Header";
import { WishlistContext } from "./WishlistContext";
import "./Wishlist.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Wishlist({handleAddToCart}) {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const handleRemoveItem = (item) => {
    removeFromWishlist(item);
  };

  

  return (
    <div className="home-container">
      <Header />
      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <h1>Please add products to your wishlist</h1>
        ) : (
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="wishlist-item-image"
                />
                <div className="wishlist-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.author}</p>
                  <p className="disc-price">₹{item.price}</p>
                  <Button
                    color="primary"
                    variant="outlined"
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className="remove-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

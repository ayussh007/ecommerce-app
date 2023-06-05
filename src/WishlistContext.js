import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const storedWishlistItems = localStorage.getItem("wishlistItems");
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const isProductInWishlist = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (isProductInWishlist) {
      alert("Product already exists in the wishlist!");
      return;
    }

    setWishlistItems((prevWishlistItems) => [...prevWishlistItems, product]);
    alert("Product added to wishlist!");
    removeFromCart(product.id);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevWishlistItems) =>
      prevWishlistItems.filter((item) => item.id !== productId)
    );
  };

  const wishlistItemCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        wishlistItemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

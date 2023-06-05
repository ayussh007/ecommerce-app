import React, { createContext, useState, useEffect, useContext } from "react";
import { WishlistContext } from "./WishlistContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(cartItems.length);
    console.log("Cart Items:", cartItems);
    console.log("Cart Item Count:", cartItemCount);
  }, [cartItems]);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (productId) => {
    console.log("Removing from cart:", productId);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartItemCount(0);
  };

  const cartItemCounts = cartItemCount.length;

  return (
    <CartContext.Provider
      value={{ cartItems, cartItemCount, addToCart, removeFromCart, clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   // const [cartItemCount, setCartItemCount] = useState(0);
//   // const { removeFromWishlist } = useContext(WishlistContext);

//   // useEffect(() => {
//   //   setCartItemCount(cartItems.length);
//   // }, [cartItems]);

//   // const addToCart = (product) => {
//   //   setCartItems((prevCartItems) => [...prevCartItems, product]);
//   // };

//   useEffect(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const isProductInCart = cartItems.some(
//       (item) => item.id === product.id
//     );

//     if (isProductInCart) {
//       alert("Product already exists in the wishlist!");
//       return;
//     }

//     setCartItems((prevCartItems) => [...prevCartItems, product]);
//     alert("Product added to wishlist!");
//     // removeFromWishlist(product.id);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.filter((item) => item.id !== productId)
//     );
//   };

//   const cartItemCount = cartItems.length;


//   return (
//     <CartContext.Provider
//       value={{ cartItems, cartItemCount, addToCart, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

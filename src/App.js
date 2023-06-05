import { Switch, Route, Link } from "react-router-dom";
import Mockman from "mockman-js"
import {Auth} from "./Auth";
import { Landing } from "./Landing";
import Cart from "./Cart";
import Login from "./Login";
import Wishlist from "./Wishlist";
import ProductsLanding from "./ProductsLanding";
import Signup from "./Signup";
import ProductDetail from "./ProductDetail";
import React, { useState, useContext } from "react";
import Checkout from "./Checkout";
import { AuthContext } from "./AuthContext";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);


  const handleAddToCart = (product) => {
    const productAvailable = cartItems.find((item) => item.id === product.id);
  
    if(product.quantity!==0){
      if (productAvailable) {
        
        alert("Product is already in the cart!");
      } else {
        // setAddedToCart(true); 
      setCartItems([...cartItems, { ...product, productinCart: 1 }]);
      alert("Product added to cart!")
      }
    }
    else{
      alert("Product is out of stock!");
  }
};


  const handleAddition = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id ? { ...item, productinCart: item.productinCart + 1 } : item
      )
    );
  };
  
  const removeFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id ? { ...item, productinCart: item.productinCart - 1 } : item
      )
    );
  };
  

  const handleDelete = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };
 
  const handleDelete2 = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };
  

  const totalQuantity = (cartItems) => {

    if (!cartItems.length) return 0;

   const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);
    
    return totalItem;
  };


  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" component={Landing} />
        <Route path = "/auth" component= {Auth} />
        <Route path = "/mockman" component= {Mockman} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/wishlist" component={Wishlist} /> */}
        <Route path="/wishlist">
        {isAuthenticated ? <Wishlist handleAddToCart={handleAddToCart} /> : <Login />}
        </Route>
        <Route path="/cart" >
        {isAuthenticated ? 
        <Cart
            cartItems={cartItems}
            handleAdd={handleAddition}
            removeFromCart={removeFromCart}
            handleDelete={handleDelete}
            totalQuantity={totalQuantity}
            handleDelete2 = {handleDelete2}
          />
          : <Login />}
        </Route>
        <Route path="/product" component={ProductsLanding} >
        <ProductsLanding
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            totalQuantity={totalQuantity}
          />
          </Route>
          <Route path="/productinfo/:productId">
          <ProductDetail handleAddToCart={handleAddToCart} />
        </Route>
        <Route path="/checkout" component={Checkout} />
      </Switch>
    
    </div>
  );
}

export default App;

import React, { useContext} from "react";
import "./Cart.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CartContext } from "./CartContext";


const Cart = ({
  cartItems,
  handleAdd,
  removeFromCart,
  handleDelete,
  handleDelete2,
  totalQuantity,
}) => {
  const getTotalCartValue = (cartItems = []) => {
    if (!cartItems.length) return 0;

    const total = cartItems
      .map((item) => item.price * item.productinCart)
      .reduce((total, n) => total + n);

    return total;
  };

  const totalPrice = getTotalCartValue(cartItems);

  const { wishlistItems, addToWishlist } = useContext(WishlistContext);

  const handleAddToWishlist = (item) => {
    const isProductInWishlist = wishlistItems.some(
      (product) => product.id === item.id
    );

    if (isProductInWishlist) {
      alert("Product is already in the wishlist!");
    } else {
      addToWishlist(item);
      handleDelete(item.id);
    }
  };

  return (
    <div className="home-container">
      <Header cartItems={cartItems} totalQuantity={totalQuantity} open />

      <div className="main">
        <div className="main-heading">Shopping Cart</div>
        <div className="main-subheading">
          {cartItems.length ? (
            <>
              <div className="main-box">
                <div className="sub-box">
                  {cartItems.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="product">
                        <Card sx={{ display: "flex" }}>
                          <CardMedia
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{ width: 100, height: 100 }}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "#535B4E" }}
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: 15 }}>
                              Rs.{item.price}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              Quantity: {item.productinCart}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="buttons">
                        <Button
                          variant="outlined"
                          color="primary"
                          className="change1"
                          onClick={(e) => handleAdd(item)}
                        >
                          +
                        </Button>
                        <div className="space"></div>
                        <Button
                          variant="outlined"
                          color="primary"
                          className="change2"
                          onClick={(e) => removeFromCart(item)}
                        >
                          -
                        </Button>
                        <div className="space"></div>
                        <Button
                          className="delete"
                          onClick={(e) => handleDelete2(item)}
                          variant="outlined"
                          color="primary"
                        >
                          DELETE
                        </Button>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => handleAddToWishlist(item)}
                        >
                          Add to Wishlist
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="seperator"></div>
                <div className="total data">
                  <div
                    className="totalprice"
                    style={{ color: "black", margin: "auto" }}
                  >
                    Total Amount: Rs.{totalPrice}
                  </div>
                  <Button
                    className="checkout-btn"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={{
                      pathname: "/checkout",
                      state: { cartItems },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-box">
              <h2>Your Cart is Found Empty</h2>
              <p>
                Please visit the products page and add some items to your cart
                for purchase as your cart was found to be empty.
              </p>
              <img
                src="https://www.nicepng.com/png/detail/322-3224210_your-cart-is-currently-empty-empty-shopping-cart.png"
                height="400"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

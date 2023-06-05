import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./ProductDetail.css";
import { WishlistContext } from "./WishlistContext";
import { AuthContext } from "./AuthContext";
import { Link} from "react-router-dom";
import { CartContext } from "./CartContext";

export default function ProductDetail({ handleAddToCart,
  handleAdd,
  handleDelete,
 }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);

  const {cartItems, addToCart, removeFromCart} = useContext(CartContext)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        console.log("ID", productId);
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        const productData = data.product;
        setProduct(productData);
        console.log("product", product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddTCart = (item) => {
    const isProductInWishlist = cartItems.some(
      (product) => product.id === item.id
    );

    if (isProductInWishlist) {
      alert("Product is already in the wishlist!");
    } else {
      addToWishlist(item);
      handleDelete(item.id);
      alert("Product added to wishlist!");
    }
  };

  return (
    <div className="home-container">
          {isAuthenticated ? (
                      <>
      <Header />
      <h1>Here's your product details</h1>
      <Box
        sx={{
          padding: "1rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
          transition: "background-color 0.3s",
          height: 550,
          width: 500,
          "&:hover": {
            backgroundColor: "#f7f7f7",
          },
          "@media (max-width: 600px)": {
            width: "90%",
            height: "auto",
          },
        }}
      >
        <img className="card-img" src={product.image} alt={product.title} />
        <div className="card-info">
          <div className="">
            <div className="card-title">
              <h3 className="card-title-header">{product.title}</h3>
              <Typography component="legend">Rating</Typography>
              <Rating name="read-only" value={product.rating} readOnly />
            </div>
            <p className="card-description">{product.author}</p>
          </div>
          <div className="price">
            <p className="actual-price">₹{product.price}</p>
          </div>
        </div>

        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Button onClick={() => addToWishlist(product)}>
            Add to Wishlist
          </Button>
        </>
      </Box>
      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        Login to see your products
                      </Button>
                    )}
    </div>
  );
}

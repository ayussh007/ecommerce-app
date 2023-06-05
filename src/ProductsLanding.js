import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import "./ProductLanding.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { WishlistContext } from "./WishlistContext";

export default function ProductsLanding({
  product,
  cartItems,
  handleAddToCart,
  totalQuantity,
  removeFromCart,
}) {
  const [productData, setProductData] = useState([]);
  const [originalProductData, setOriginalProductData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [filters, setFilters] = useState({
    price: "",
    category: [],
    rating: 0,
    priceOrder: "",
  });

  const token = localStorage.getItem("token");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const history = useHistory();

  const { isAuthenticated } = useContext(AuthContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [addedToCart, setAddedToCart] = useState(false);

  const getData = async () => {
    try {
      const creds = {
        email: "ayussharora@gmail.com",
        password: "ayussharora",
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(creds),
      });

      const { encodedToken } = await res.json();
      console.log(encodedToken);
      localStorage.setItem("encodedToken", encodedToken);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductById = (productId) => {
    return productData.find((product) => product._id === productId);
  };

  const performAPICall = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.status === 200) {
        const data = await res.json();
        setProductData(data.products);
        setOriginalProductData(data.products); // Set the original product data
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: [],
        }));
      } else {
        console.log("API request failed with status:", res.status);
      }
    } catch (error) {
      console.log("API request failed with error:", error);
    } finally {
      setLoading(false);
    }
  };

  const performCategoryAPICall = async (category) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${category}`);
      if (res.status === 200) {
        const data = await res.json();
        setProductData(data.products);
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: [category],
        }));
      } else {
        console.log("API request failed with status:", res.status);
      }
    } catch (error) {
      console.log("API request failed with error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (searchTerm) => {
    if (searchTerm === "") {
      // If the search term is empty, reset the product data to the original data
      setProductData(originalProductData);
      // setProductData(productData)
    } else {
      // Filter the product data based on the search term
      const searchedProducts = originalProductData.filter((product) => {
        const { title, author, categoryName } = product;
        const searchString = `${title.toLowerCase()} ${author.toLowerCase()} ${categoryName.toLowerCase()}`;

        return searchString.includes(searchTerm.toLowerCase());
      });
      setProductData(searchedProducts);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      if (category) {
        await performCategoryAPICall(category);
      } else {
        await performAPICall();
      }
    };
    fetchData();
  }, [category]);

  const handleCategoryFilterChange = (value) => {
    const updatedCategory = filters.category.includes(value)
      ? filters.category.filter((category) => category !== value)
      : [...filters.category, value];

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: updatedCategory,
    }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      handleCategoryFilterChange(value);
    } else if (name === "price" || name === "sort") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        price: name === "price" ? value : "",
        sort: name === "sort" ? value : "",
      }));
    } else if (name === "rating" || name === "minRating") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        rating: name === "rating" ? parseFloat(value) : prevFilters.rating,
        minRating:
          name === "minRating" ? parseFloat(value) : prevFilters.minRating,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleRatingFilterChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: value,
    }));
  };

  const handlePriceOrderChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceOrder: value,
    }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    console.log("New Price Range:", newValue);
  };

  const clearFilters = () => {
    setFilters({
      price: "",
      category: [],
      rating: 0,
      minRating: 0,
    });
    setPriceRange([500, 5000]);
  };

  const filteredProducts = productData
    .filter((product) => {
      const { price, category, rating, minRating } = filters;
      const [minPrice, maxPrice] = priceRange;

      if (
        price === "lowToHigh" &&
        (product.price < minPrice || product.price > maxPrice)
      ) {
        return false;
      } else if (
        price === "highToLow" &&
        (product.price > maxPrice || product.price < minPrice)
      ) {
        return false;
      }

      if (category.length > 0 && !category.includes(product.categoryName)) {
        return false;
      }

      if (rating > 0 && product.rating < rating) {
        return false;
      }

      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const { priceOrder } = filters;

      if (priceOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (priceOrder === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  console.log("Filtered Products:", filteredProducts);

  const addToCart = (product) => {
    handleAddToCart(product);

    setAddedToCart(true);
  };

  const isProductInCart = (product) => {
    return cartItems.some(
      (item) => item._id === product._id && item.productinCart === 1
    );
  };

  return (
    <div className="home-container">
      <Header
        onSearch={onSearch}
        productData={productData}
        setProductData={setProductData}
      />

      <Grid
        container
        spacing={2}
        style={{ marginTop: "2em", marginBottom: "2em" }}
      >
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <h2>
            <b>Filters</b>
          </h2>
          <div className="filter-section" style={{ marginBottom: "20px" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.category.includes("fiction")}
                    onChange={handleFilterChange}
                    name="category"
                    value="fiction"
                  />
                }
                label="Fiction"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.category.includes("non-fiction")}
                    onChange={handleFilterChange}
                    name="category"
                    value="non-fiction"
                  />
                }
                label="Non-Fiction"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.category.includes("horror")}
                    onChange={handleFilterChange}
                    name="category"
                    value="horror"
                  />
                }
                label="Horror"
              />
              <Typography variant="body2" gutterBottom>
                <h3>
                  <b>Sort By: </b>
                </h3>
              </Typography>
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="priceOrder"
                    value="lowToHigh"
                    checked={filters.priceOrder === "lowToHigh"}
                    onChange={() => handlePriceOrderChange("lowToHigh")}
                  />
                }
                label="Low to High"
              />
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="priceOrder"
                    value="highToLow"
                    checked={filters.priceOrder === "highToLow"}
                    onChange={() => handlePriceOrderChange("highToLow")}
                  />
                }
                label="High to Low"
              />
              <Typography variant="body2" gutterBottom>
                <h3>
                  <b>Rating</b>
                </h3>
              </Typography>
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    checked={filters.rating === 1}
                    onChange={() => handleRatingFilterChange(1)}
                  />
                }
                label="1 Star & above"
              />
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    checked={filters.rating === 2}
                    onChange={() => handleRatingFilterChange(2)}
                  />
                }
                label="2 Stars & above"
              />
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    checked={filters.rating === 3}
                    onChange={() => handleRatingFilterChange(3)}
                  />
                }
                label="3 Stars & above"
              />
              <FormControlLabel
                control={
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    checked={filters.rating === 4}
                    onChange={() => handleRatingFilterChange(4)}
                  />
                }
                label="4 Stars & above"
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={clearFilters}
              style={{ marginTop: "20px" }}
            >
              Clear Filters
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={9} lg={10}>
          <div className="divider"></div>
          <div className="product-section">
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product._id}
                  style={{ marginBottom: "20px" }}
                >
                  <Box
                    sx={{
                      padding: "1rem",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                      borderRadius: "8px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#f7f7f7",
                      },
                    }}
                  >
                    <Link
                      to={`/productinfo/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img
                        className="card-img"
                        src={product.image}
                        alt={product.title}
                      />
                    </Link>
                    <div className="card-info">
                      <div className="">
                        <div className="card-title">
                          <h3 className="card-title-header">{product.title}</h3>

                          <Typography component="legend">Rating</Typography>
                          <Rating
                            name="read-only"
                            value={product.rating}
                            readOnly
                          />
                        </div>
                        <p className="card-description">{product.author}</p>
                      </div>
                      <div className="price">
                        <p className="actual-price">₹{product.price}</p>
                      </div>
                    </div>
                    {isAuthenticated ? (
                      <>
                        {isProductInCart(product) ? (
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/cart"
                          >
                            Go to Cart
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        )}
                        <Button onClick={() => addToWishlist(product)}>
                          Add to Wishlist
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        Login to Add to Cart / Wishlist
                      </Button>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

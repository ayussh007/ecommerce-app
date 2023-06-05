import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Button, Container, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import "./Landing.css"
export const Landing = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(false);

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
      console.log(encodedToken)
      localStorage.setItem("encodedToken", encodedToken);
    } catch (e) {
      console.log(e);
    }
  };


  const performAPICall = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.status === 200) {
        const data = await res.json();
        setProductData(data.products);
      } else {
        console.log("API request failed with status:", res.status);
      }
    } catch (error) {
      console.log("API request failed with error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.status === 200) {
        const data = await res.json();
        setCategoryData(data.categories);
      } else {
        throw new Error("API request failed with status: " + res.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      await Promise.all([performAPICall(), fetchCategories()]);
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header children />
    
      <Box className="home-img-main">
        <Box className="bg-img-main" />
        <Container>
          <Box className="home-page-text">
            <Box className="main-text">
              <Typography className="main-text" variant="h3" component="h3">
                Welcome to our <span className="title">BookHub</span>
              </Typography>
              <div>
                <Typography
                  style={{ marginTop: "2rem" }}
                  variant="h4"
                  component="h4"
                  className="main-text-title"
                >
                  Discover a world of knowledge and embark on incredible
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  className="main-text-title"
                >
                  literary journeys.
                </Typography>
              </div>
              <Link to="/product">
                <Button
                  variant="contained"
                  style={{
                    textDecoration: "underline",
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "2rem",
                  }}
                  className="product-btn"
                >
                  SHOP NOW
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
        <Box className="overlay" />
      </Box>

      <div className="centered-container" style={{marginTop: "2rem"}}>
        <Typography className="sub-head" variant="h4" component="h4">
          Find Your Next Favorite
        </Typography>
      </div>
      <div className="centered-container">
        <Typography variant="h6" component="h6" style={{marginBottom: "2rem", fontWeight: "bold"}}>
          Dive into an array of book categories and find your next favorite
          genre to expand your reading horizons.
        </Typography>
      </div>

      <Grid container spacing={2}>
        {categoryData.map((category) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={category._id}
            className="category-grid-item"
            style={{ marginBottom: "3rem" }}
          >
            <Link
              to={`/product?category=${category.categoryName}`}
              style={{ textDecoration: "none", color: "darkblue" }}
            >
              <Box
                sx={{
                  padding: "2rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5);",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "lightblue",
                  },
                }}
              >
                <Typography variant="h2" component="h2">
                  {category.categoryName}
                </Typography>
                <Typography
                  style={{ fontSize: "15px" }}
                  variant="body"
                  component="p"
                >
                  {category.description}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

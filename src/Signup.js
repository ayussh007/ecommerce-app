import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import Header from "./Header"
import { AuthContext } from "./AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = {
        email,
        password,
        confirmPassword,
      };
  
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      if (response.ok) {
        const { encodedToken } = responseData;
        localStorage.setItem("encodedToken", encodedToken);
        login(); 
        history.push("/product"); 
      } else {
        console.log("Signup failed");
        const errorMessage = responseData.errors;
        alert(errorMessage);
      }
    } catch (error) {
      console.log("Signup failed with error:", error);
    }
  };
  

  return (
    <div className="home-container">
    <Header />
    <Box sx={{ mt: 4, backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: "10px"}} >
        Signup
      </Typography>
      <Box
        component="form"
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSignup}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          sx={{ width: 300, mt: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          sx={{ width: 300, mt: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          sx={{ width: 300, mt: 2 }}
        />
        <Link to="/product">
        <Button type="submit" variant="contained" onClick={handleSignup} sx={{ mt: 4 }}>
          Signup
        </Button>
        </Link>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
    </div>
  );
};

export default Signup;

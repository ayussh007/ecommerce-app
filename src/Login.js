import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "./AuthContext";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        email,
        password,
      };

      const response = await fetch("/api/auth/login", {
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
        console.log("Login failed");
        const errorMessage = responseData.errors;
        alert(errorMessage);
      }
    } catch (error) {
      console.log("Login failed with error:", error);
    }
  };

  const handleLoginWithTestCredentials = () => {
    setEmail("ayussharora@gmail.com");
    setPassword("ayussharora");
  };

  return (
    <div className="home-container">
      <Header />
      <Box sx={{ mt: 4, backgroundColor: "#f5f5f5", padding: "20px" }}>
        <Typography variant="h4" component="h2" align="center">
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleLogin}
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
          <Button type="submit" variant="contained" sx={{ mt: 4 }}>
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLoginWithTestCredentials}
            sx={{ mt: 2 }}
          >
            Login with Test Credentials
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup">Create New Account</Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Login;

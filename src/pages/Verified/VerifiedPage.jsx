import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Paper, Typography, Box, Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

function VerifiedPage() {
  const { user, dispatch } = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTitle();
  }, []);

  const getTitle = async () => {
    // const response = await axios.get(`${tempUrl}/verified/${user.token}`);
    const response = await axios.post(`${tempUrl}/verified`, {
      id: user._id,
      token: user.token
    });
    setTitle(response.data[0].title);
  };

  const signupButtonHandler = () => {
    navigate("/signup");
  };

  const loginButtonHandler = () => {
    navigate("/");
  };

  return (
    <Box sx={container}>
      <Paper elevation={3} sx={contentContainer}>
        <Box sx={titleContainer}>
          <Typography variant="h5">{title}</Typography>
          {user && (
            <Box sx={contentsContainer}>
              <Typography>{user.username}</Typography>
              <Typography>{user.email}</Typography>
              <Typography>{user.token}</Typography>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={input}
            onClick={loginButtonHandler}
          >
            Login
          </Button>
          <Button
            variant="text"
            sx={signupButton}
            onClick={signupButtonHandler}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default VerifiedPage;

const container = {
  m: "auto"
};

const contentContainer = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  p: 3
};

const titleContainer = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column"
};

const contentsContainer = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  overflow: "hidden"
};

const input = {
  mt: 2
};

const signupButton = {
  width: "60%",
  margin: "auto",
  mt: 2
};

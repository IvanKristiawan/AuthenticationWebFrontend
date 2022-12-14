import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { tempUrl } from "../../contexts/ContextProvider";
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  TextField,
  Snackbar
} from "@mui/material";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (e) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(`${tempUrl}/auth/register`, {
        username,
        email,
        password
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      const res2 = await axios.post(`${tempUrl}/auth/login`, {
        email,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res2.data.details });
      navigate("/verified");
    } catch (err) {
      setOpen(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const loginButtonHandler = () => {
    navigate("/");
  };

  return (
    <Box sx={container}>
      <form onSubmit={handleSubmit(handleClick)}>
        <Paper elevation={3} sx={contentContainer}>
          <Box sx={titleContainer}>
            <Typography variant="h5">Sign Up</Typography>
          </Box>
          <TextField
            id="username"
            label="Username"
            value={username}
            {...register("username", {
              required: "Username harus diisi!"
            })}
            error={!!errors?.username}
            helperText={errors?.username ? errors.username.message : null}
            onChange={(e) => setUsername(e.target.value)}
            sx={input}
          />
          <TextField
            id="email"
            label="Email"
            value={email}
            {...register("email", {
              required: "Email harus diisi!"
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
            onChange={(e) => setEmail(e.target.value)}
            sx={input}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            {...register("password", {
              required: "Password harus diisi!"
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
            onChange={(e) => setPassword(e.target.value)}
            sx={input}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={input}
          >
            Sign Up
          </Button>
          <Button variant="text" sx={signupButton} onClick={loginButtonHandler}>
            Login
          </Button>
          {error && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {error.message}
              </Alert>
            </Snackbar>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default Register;

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
  justifyContent: "center"
};

const input = {
  mt: 2
};

const signupButton = {
  width: "60%",
  margin: "auto",
  mt: 2
};

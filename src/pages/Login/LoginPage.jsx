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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const signupButtonHandler = () => {
    navigate("/signup");
  };

  const handleClick = async (e) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${tempUrl}/auth/login`, {
        email,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/verified");
    } catch (err) {
      setOpen(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Box sx={container}>
      <form onSubmit={handleSubmit(handleClick)}>
        <Paper elevation={3} sx={contentContainer}>
          <Box sx={titleContainer}>
            <Typography variant="h5">Login</Typography>
          </Box>
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
            Login
          </Button>
          <Button
            variant="text"
            sx={signupButton}
            onClick={signupButtonHandler}
          >
            Sign Up
          </Button>
          {error && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={alertBox}>
                Username atau Password salah!
              </Alert>
            </Snackbar>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default Login;

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

const alertBox = {
  width: "100%"
};

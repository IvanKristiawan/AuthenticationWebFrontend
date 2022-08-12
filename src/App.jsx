import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "./contexts/AuthContext";
import { Box } from "@mui/material";
// Pages
import { LoginPage, SignupPage, VerifiedPage } from "./pages";

export default function App() {
  const ProtectedRouteUser = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return children;
    }

    return <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* Login */}
            <Route path="/" element={<LoginPage />} />
            {/* Register */}
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/verified"
              element={
                <ProtectedRouteUser>
                  <VerifiedPage />
                </ProtectedRouteUser>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

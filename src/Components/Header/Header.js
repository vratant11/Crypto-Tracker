import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../../Cryptocontext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Header() {
  let navigate = useNavigate();

  const { Currency, setCurrency } = CryptoState();
  // console.log(Currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className="title"
              variant="h6"
            >
              Crypto Hunter
            </Typography>
            <Select
              value={Currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ width: 100, height: 40, marginRight: 15 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;

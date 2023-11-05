import React, { useEffect, useState } from "react";
import { CoinList } from "../../Config/Api";
import { CryptoState } from "../../Cryptocontext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { Container } from "@mui/system";
import {
  LinearProgress,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./CoinTable.css";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { Currency, Symbol } = CryptoState();

  const fetch = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(Currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [Currency]);
  //   console.log(coins);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  //   console.log(handleSearch());
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center", backgroundColor: "#14161a" }}>
          <Typography variant="h4" style={{ margin: 18 }}>
            Crypto Currency By Market Cap
          </Typography>
          <TextField
            label="Search for Crypto Curency"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          ></TextField>

          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : handleSearch().length > 0 ? (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    <TableCell className="tableCell">Coin</TableCell>
                    <TableCell className="tableCell" align="right">
                      Price
                    </TableCell>
                    <TableCell className="tableCell" align="right">
                      24h Change
                    </TableCell>
                    <TableCell className="tableCell" align="right">
                      Market Cap
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className="row"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            styles={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {Symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {Symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            ) : (
              <div className="noData">No Result Found</div>
            )}
          </TableContainer>

          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="pagination"
            count={Number((handleSearch()?.length / 10).toFixed(0))}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default CoinsTable;

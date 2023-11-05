import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../Cryptocontext";
import axios from "axios";
import { SingleCoin } from "../../Config/Api";
import CoinInfo from "../../Components/CoinInfo/CoinInfo";
import { Box, Container, styled } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { Currency, Symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  // console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function createMarkup() {
    return { __html: coin?.description.en.split(". ")[0] };
  }

  const Container = styled("div")(({ theme }) => ({
    backgroundColor: "#14161a",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  const Sidebar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <div
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={createMarkup()}
        />
        <MarketData>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Current Price :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {Symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[Currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {Symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[Currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
}

export default CoinPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { HistoricalChart } from "../../Config/Api";
import { CryptoState } from "../../Cryptocontext";
import "./CoinInfo.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { chartDays } from "../../Config/data";
import SelectButton from "../SelectButton/SelectButton";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function CoinInfo({ coin }) {
  const [historicalData, sethistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { Currency, Symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, Currency));
    sethistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [Currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const Container = styled("div")(({ theme }) => ({
    backgroundColor: "#14161a",
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={200}
            thickness={1}
          />
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <Line
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${Currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={days.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default CoinInfo;

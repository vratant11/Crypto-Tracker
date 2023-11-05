import React from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable/CoinsTable";

function Homepage() {
  return (
    <div style={{ backgroundColor: "#14161a" }}>
      <Banner />
      <CoinsTable />
    </div>
  );
}

export default Homepage;

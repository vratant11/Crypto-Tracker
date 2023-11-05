import React from "react";
import styled from "@emotion/styled";

const SelectButton = ({ children, selected, onClick }) => {
  const Button = styled("div")(() => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  }));
  return <Button onClick={onClick}>{children}</Button>;
};

export default SelectButton;

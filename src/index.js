//index.js

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import axios from "axios";

export const fetchEvolutionChain = async (id) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  );
  return response.data;
};

// ReactDOM.renderをcreateRootに変更

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // react-dom/clientからimport
root.render(<App />);

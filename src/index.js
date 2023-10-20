import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
//import "./index.css"; // index.cssファイルのパスに合わせてください

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

// // React 18の新しいAPI createRootを使用してアプリをレンダリング
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

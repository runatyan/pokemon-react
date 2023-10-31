// features/pokemon/PokemonStats.js

import React from "react";
// import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { Chart as ChartJSComponent, Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const PokemonStats = ({ pokemon }) => {
  // pokemonがundefinedだった場合の処理
  if (!pokemon) {
    return <p>Error: pokemon is undefined</p>;
  }

  // statsがundefinedだった場合の処理
  const stats = pokemon.stats;
  if (!stats) {
    return <p>Error: stats is undefined</p>;
  }

  const labels = pokemon.stats.map((stat) => stat.name);

  //ステータスの取得は完了
  const data = {
    labels,
    datasets: [
      {
        data: pokemon.stats.map((stat) => stat.value),
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        scales: {
          x: {
            type: "category",
          },
        },
      }}
    />
  );
};

export default PokemonStats;

// features/pokemon/PokemonStats.js

import React from "react";
import { Bar } from "react-chartjs-2";

const PokemonStats = ({ pokemon }) => {
  const data = {
    labels: pokemon.stats.map((s) => s.stat.name),
    datasets: [
      {
        label: "Stats",
        data: pokemon.stats.map((s) => s.base_stat),
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default PokemonStats;

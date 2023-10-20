// // PokemonStats.js

// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";

// function PokemonStats({ pokemon }) {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const labels = pokemon.stats.map((stat) => stat.name);
//     const data = pokemon.stats.map((stat) => stat.value);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Stats",
//           data,
//           backgroundColor: "#FF0000",
//         },
//       ],
//     });
//   }, [pokemon.stats]);

//   return (
//     <div>
//       <h3>ステータス</h3>

//       <Bar data={chartData} />
//     </div>
//   );
// }

// export default PokemonStats;

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

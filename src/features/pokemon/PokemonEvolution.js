// // PokemonEvolution.js

// import { useState, useEffect } from "react";
// import { fetchEvolutionChain } from "../../api";

// function PokemonEvolution({ pokemon }) {
//   const [evolutionChain, setEvolutionChain] = useState(null);

//   useEffect(() => {
//     // 進化情報を取得
//     getEvolutionChain(pokemon.id).then((data) => {
//       setEvolutionChain(data);
//     });
//   }, [pokemon.id]);

//   return (
//     <div>
//       <h3>進化</h3>

//       {/* 進化ツリーをレンダリング */}
//     </div>
//   );
// }

// export default PokemonEvolution;

// features/pokemon/PokemonEvolution.js
import React, { useState, useEffect } from "react";
import { fetchEvolutionChain } from "../../api";

export const getEvolutionChain = async (id) => {
  const data = await fetchEvolutionChain(id);

  // dataを加工して返す
  const chain = [];
  // チェーンをたどるロジック

  return chain;
};

const PokemonEvolution = ({ pokemon }) => {
  const [chain, setChain] = useState(null);

  useEffect(() => {
    getEvolutionChain(pokemon.id).then((c) => {
      setChain(c);
    });
  }, [pokemon.id]);

  return <div>{chain && chain.map((p) => <p>{p.name}</p>)}</div>;
};

export default PokemonEvolution;

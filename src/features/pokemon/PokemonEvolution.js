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

//ここにタイプに関する処理が不備

//chainの値がnull
/*
1
1
1
1
1
1
1
1
*/
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

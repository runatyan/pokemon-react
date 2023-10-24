// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";

const PokemonInfo = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <Badge name={pokemon.types[0].type.name} />
    </div>
  );
};

export default PokemonInfo;

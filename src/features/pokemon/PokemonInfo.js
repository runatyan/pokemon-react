// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";

const PokemonInfo = ({ pokemon }) => {
  const name = pokemon.name;
  const type = pokemon.types[0];

  return (
    <div>
      <h2>{name}</h2>
      <Badge name={type} />
    </div>
  );
};

export default PokemonInfo;

// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";

const PokemonInfo = ({ pokemon }) => {
  const id = pokemon.id;
  const name = pokemon.name;
  const type = pokemon.types[0];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const height = pokemon.height;
  const weight = pokemon.weight;

  return (
    <div>
      <h2>{name}</h2>
      <Badge name={type} />
      <img src={image} alt={pokemon.name} />
      <p>#00{id}</p>
      <p>高さ:{height / 10}m</p>
      <p>重さ:{weight / 10}kg</p>
    </div>
  );
};

export default PokemonInfo;

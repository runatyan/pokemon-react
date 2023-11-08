// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";

const PokemonInfo = ({ pokemon }) => {
  const id = pokemon.id.toString().padStart(4, "0");
  const name = pokemon.name;
  const types = pokemon.types;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const height = pokemon.height;
  const weight = pokemon.weight;

  return (
    <div>
      <h2>{name}</h2>
      <div className="pokemon-types">
        {types.map((type, index) => (
          <span key={index} className={`type ${type}`}>
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <img src={image} alt={pokemon.name} />
      <p>#{id}</p>
      <p>高さ:{height / 10}m</p>
      <p>重さ:{weight / 10}kg</p>
    </div>
  );
};

export default PokemonInfo;

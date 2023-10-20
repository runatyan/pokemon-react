// PokemonList.js

import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;

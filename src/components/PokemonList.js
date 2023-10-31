// PokemonList.js

import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons }) {
  // pokemonsが空の場合の処理を追加
  if (!pokemons.length) {
    return <p>No pokemons found.</p>;
  }

  //ここでタイプ情報がない
  //console.log(pokemons);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;

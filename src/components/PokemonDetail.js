// PokemonDetail.js

import { useEffect } from "react";

import React from "react";

// import文を修正
import { fetchPokemon, fetchPokemons } from "../api";

import { fetchEvolutionChain } from "../api";

import PokemonInfo from "../features/pokemon/PokemonInfo";
import PokemonStats from "../features/pokemon/PokemonStats";
import PokemonEvolution from "../features/pokemon/PokemonEvolution";

function PokemonDetail({ pokemon }) {
  useEffect(() => {
    fetchEvolutionChain(pokemon.id);
  }, [pokemon.id]);

  return (
    <div className="pokemon-detail">
      <PokemonInfo pokemon={pokemon} />

      <PokemonStats pokemon={pokemon} />

      <PokemonEvolution pokemon={pokemon} />
    </div>
  );
}

export default PokemonDetail;

// PokemonDetail.js

import { useEffect } from "react";

import React from "react";

import { fetchEvolutionChain } from "../api";

import PokemonInfo from "../features/pokemon/PokemonInfo";
import PokemonStats from "../features/pokemon/PokemonStats";
import PokemonEvolution from "../features/pokemon/PokemonEvolution";

//ここではタイプ情報正常
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

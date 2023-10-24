// api/index.js

import axios from "axios";

export const fetchPokemon = async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return response.data;
};

export const fetchPokemons = async (offset, limit) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon/", {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

export const fetchEvolutionChain = async (id) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  );
  return response.data;
};

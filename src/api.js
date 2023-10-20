// api.js

// import { fetch } from "some-fetch-lib";

// export async function fetchPokemons() {
//   try {
//     const response = await fetch(
//       "https://pokeapi.co/api/v2/pokemon?limit=1000"
//     );

//     if (!response.ok) {
//       throw new Error("Fetch failed");
//     }

//     const data = await response.json();

//     const results = data.results.map((result) => {
//       const id = Number(result.url.split("/")[6]);
//       return {
//         ...result,
//         id,
//         image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
//       };
//     });

//     return results;
//   } catch (error) {
//     throw new Error("Fetch Pokemons failed");
//   }
// }

// export async function fetchPokemon(id) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     if (!response.ok) {
//       throw new Error("Fetch failed");
//     }

//     const data = await response.json();

//     const pokemon = {
//       id: data.id,
//       name: data.name,
//       image: data.sprites.front_default,
//       height: data.height,
//       weight: data.weight,
//       types: data.types.map((type) => type.type.name),
//       stats: data.stats.map((stat) => ({
//         name: stat.stat.name,
//         value: stat.base_stat,
//       })),
//     };

//     return pokemon;
//   } catch (error) {
//     throw new Error("Fetch Pokemon failed");
//   }
// }

// export const fetchEvolutionChain = async (id) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/evolution-chain/${id}/`
//   );
//   return await response.json();
// };

// api.js

import axios from "axios";

export async function fetchPokemons() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const data = response.data;

    const results = data.results.map((result) => {
      const id = Number(result.url.split("/")[6]);
      return {
        ...result,
        id,
        image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
      };
    });

    return results;
  } catch (error) {
    throw new Error("Fetch Pokemons failed");
  }
}

export async function fetchPokemon(id) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const data = response.data;

    const pokemon = {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      types: data.types.map((type) => type.type.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };

    return pokemon;
  } catch (error) {
    throw new Error("Fetch Pokemon failed");
  }
}

export const fetchEvolutionChain = async (id) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  );
  return response.data;
};

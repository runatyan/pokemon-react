// api.js

import axios from "axios";

export async function fetchPokemons() {
  const maxPokemonDate = 12;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemonDate}`
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Fetch failed");
    }

    const data = response.data;

    const pokemons = [];

    for (let result of data.results) {
      const id = Number(result.url.split("/")[6]);

      const pokemon = await fetchPokemon(id); // 個別に呼び出し

      pokemons.push({
        ...result,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        types: pokemon.types, // ここでタイプを取得
      });
    }
    return pokemons;
  } catch (error) {
    throw new Error("Fetch Pokemons failed");
  }
}

export async function fetchPokemon(id) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (response.status < 200 || response.status >= 300) {
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
  console.log(id);
  console.log(response);
  return response.data;
};

// ランダムなポケモンを取得する関数
export async function fetchRandomPokemons(number) {
  try {
    // 全ポケモンの数を取得
    const totalResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
    );
    const totalCount = totalResponse.data.count;

    // ランダムなポケモンのIDを生成
    const randomIds = new Set();
    while (randomIds.size < number) {
      const randomId = Math.floor(Math.random() * totalCount) + 1;
      randomIds.add(randomId);
    }

    // ランダムなポケモンを取得
    const promises = [...randomIds].map((id) => fetchPokemon(id));
    const randomPokemons = await Promise.all(promises);

    return randomPokemons;
  } catch (error) {
    throw new Error("Fetch random pokemons failed");
  }
}

/*
このページの役割

pokeapiから情報を取ってくる。
主にポケモンの情報を取ってくる。名前、id、画像...など

*/

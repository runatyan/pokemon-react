// api.js

import axios from "axios";

//ファーストページの表示取得元
export async function fetchPokemons(limit = 100, offset = 0) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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
        types: pokemon.types,
      });
    }
    return pokemons;
  } catch (error) {
    throw new Error("Fetch Pokemons failed");
  }
}

//個別ページの表示取得元
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
      version: data.game_indices.map((version) => version.version.name),
    };

    return pokemon;
  } catch (error) {
    throw new Error("Fetch Pokemon failed");
  }
}

export const fetchEvolutionChain = async (id) => {
  try {
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const evolutionData = evolutionChainResponse.data;

    let chainData = [];
    let currentEvolution = evolutionData.chain;

    const processEvolution = async (evolution) => {
      if (!evolution) return;
      const pokemonData = await fetchPokemonByName(evolution.species.name);
      chainData.push({
        name: pokemonData.name,
        id: pokemonData.id,
        image: pokemonData.sprites.front_default,
        types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
      });

      // 全ての進化先に対して再帰的に処理
      for (let nextEvolution of evolution.evolves_to) {
        await processEvolution(nextEvolution);
      }
    };

    await processEvolution(currentEvolution);

    return chainData;
  } catch (error) {
    throw new Error(`Fetch evolution chain failed: ${error.message}`);
  }
};

// ポケモンの名前からポケモンの詳細を取得する関数
export const fetchPokemonByName = async (name) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Fetch pokemon by name failed: ${error.message}`);
  }
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

// ポケモンの総数を取得するための関数
export async function fetchTotalPokemonCount() {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/?limit=0`
    );
    return response.data.count;
  } catch (error) {
    throw new Error("Fetch total pokemon count failed");
  }
}

export async function fetchPokemonSpecies(id) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Fetch failed");
    }
    const speciesData = response.data;

    // 日本語の説明をフィルタリング
    const japaneseDescriptions = speciesData.flavor_text_entries.filter(
      (entry) => entry.language.name === "ja"
    );

    return {
      ...speciesData,
      flavor_text_entries: japaneseDescriptions,
    };
  } catch (error) {
    throw new Error("Fetch Pokemon species failed");
  }
}

/*
このページの役割

pokeapiから情報を取ってくる。
主にポケモンの情報を取ってくる。名前、id、画像...など

*/

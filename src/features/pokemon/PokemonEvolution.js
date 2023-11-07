// features/pokemon/PokemonEvolution.js

import React, { useState, useEffect } from "react";
import { fetchEvolutionChain } from "../../api";

export const getEvolutionChain = async (id) => {
  const data = await fetchEvolutionChain(id);

  const chain = []; // 進化チェーンを格納する配列

  //console.log(data);

  // 最初のポケモンを取得
  const firstPokemon = {
    name: data.chain.species.name,
    url: data.chain.species.url,
  };

  chain.push(firstPokemon); // 最初のポケモンをチェーンに追加

  // 進化の詳細情報をたどりながら進化チェーンを構築
  let currentEvolutions = data.chain.evolves_to;

  while (currentEvolutions && currentEvolutions.length > 0) {
    const nextEvolutions = [];

    // 現在の進化階層を処理
    for (const evolution of currentEvolutions) {
      if (evolution.species) {
        const evolvedPokemon = {
          name: evolution.species.name,
          url: evolution.species.url,
        };

        chain.push(evolvedPokemon); // 進化したポケモンをチェーンに追加

        // 次の進化情報を取得
        if (evolution.evolves_to && evolution.evolves_to.length > 0) {
          nextEvolutions.push(...evolution.evolves_to);
        }
      }
    }

    currentEvolutions = nextEvolutions; // 次の進化階層に移動
  }

  return chain; // 完成した進化チェーンを返す
};

const PokemonEvolution = ({ pokemon }) => {
  const [chain, setChain] = useState(null);

  useEffect(() => {
    getEvolutionChain(pokemon.id).then((c) => {
      setChain(c);
    });
  }, [pokemon.id]);

  return <div>{chain && chain.map((p) => <p key={p.name}>{p.name}</p>)}</div>;
};

export default PokemonEvolution;

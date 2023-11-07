// IndexPage.js

import { useState, useEffect } from "react";

import { fetchPokemons } from "../api";
import PokemonList from "../components/PokemonList";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";
import PokemonSpecies from "../features/pokemon/PokemonSpecies";

function IndexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Promiseの結果を待つ
        const result = await fetchPokemons();

        setPokemons(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  //ここでタイプ追加ができていない
  return (
    <div>
      <h1>ポケモン一覧</h1>

      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default IndexPage;

/*
このページの役割

トップページの設計するところ
パーツを集めて作ったものを組み合わせる

*/

// IndexPage.js

import { useState, useEffect } from "react";

import { fetchPokemons } from "../api";
import PokemonList from "../components/PokemonList";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";

function IndexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Promiseの結果を待つ
        const result = await fetchPokemons();

        console.log(result);

        const pokemonData = result.results;

        // 結果をセット
        setPokemons(pokemonData);
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

  return (
    <div>
      <h1>ポケモン一覧</h1>

      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default IndexPage;

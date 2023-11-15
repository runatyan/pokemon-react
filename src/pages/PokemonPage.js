// PokemonPage.js

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchPokemon, fetchPokemonSpecies } from "../api";
import PokemonDetail from "../components/PokemonDetail";
import PokemonNav from "../features/ui/PokemonNav";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";

function PokemonPage() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //ここの値が表示件数分に変える必要がある
  const MAX_POKEMON_COUNT = 100;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchPokemon(id);
        const speciesData = await fetchPokemonSpecies(id);

        // 前後のポケモンのIDを計算する
        const prevId = data.id > 1 ? data.id - 1 : null;
        const nextId = data.id < MAX_POKEMON_COUNT ? data.id + 1 : null;

        setPokemon({
          ...data,
          prev: prevId,
          next: nextId,
          species: speciesData,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="inner">
      <div className="row">
        <Link to={`/`}>TOP</Link>
        <p>{`＞${pokemon.name}`}</p>
      </div>
      <PokemonNav pokemon={pokemon} />

      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}

export default PokemonPage;

/*
このページの役割

詳細ページの設計するところ
パーツを集めて作ったものを組み合わせる

*/

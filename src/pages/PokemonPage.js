// PokemonPage.js

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchPokemon } from "../api";
import PokemonDetail from "../components/PokemonDetail";
import PokemonNav from "../features/ui/PokemonNav";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";

function PokemonPage() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchPokemon(id);
        setPokemon(data);
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
    <div>
      <PokemonNav pokemon={pokemon} />

      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}

export default PokemonPage;

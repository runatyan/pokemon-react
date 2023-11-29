// IndexPage.js
import { useState, useEffect } from "react";

import {
  fetchPokemons,
  fetchRandomPokemons,
  fetchTotalPokemonCount,
} from "../api";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";
import SwiperComponent from "../components/SwiperComponent";
import InnerComponent from "../components/InnerComponent";

function IndexPage() {
  const NUMBER_OF_INITIAL_POKEMONS = 20;

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState("number_asc");
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    sortPokemons(e.target.value);
  };

  const handleLoadMoreClick = () => {
    setIsLoadMore(true);
  };

  const sortPokemons = (order) => {
    let sortedPokemons = [...pokemons];
    switch (order) {
      case "number_asc":
        sortedPokemons.sort((a, b) => a.id - b.id);
        break;
      case "number_desc":
        sortedPokemons.sort((a, b) => b.id - a.id);
        break;
      case "name_asc":
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 他のソートオプションもここに追加することができます
        break;
    }
    setPokemons(sortedPokemons);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pokemons = await fetchPokemons();
        setPokemons(pokemons);
        const randomPokemons = await fetchRandomPokemons(6);
        setRandomPokemons(randomPokemons);
        const totalCount = await fetchTotalPokemonCount();
        setTotalPokemons(totalCount);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
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
      <SwiperComponent randomPokemons={randomPokemons} />
      <InnerComponent
        pokemons={pokemons}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        isLoadMore={isLoadMore}
        handleLoadMoreClick={handleLoadMoreClick}
        NUMBER_OF_INITIAL_POKEMONS={NUMBER_OF_INITIAL_POKEMONS}
      />
    </div>
  );
}

export default IndexPage;

// /*
// このページの役割

// トップページの設計するところ
// パーツを集めて作ったものを組み合わせる

// */

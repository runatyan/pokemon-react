// IndexPage.js

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import {
  fetchPokemons,
  fetchRandomPokemons,
  fetchTotalPokemonCount,
} from "../api";
import PokemonList from "../components/PokemonList";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";

//ファーストページの内容を全て持つところ
function IndexPage() {
  const NUMBER_OF_INITIAL_POKEMONS = 20;

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [randomPokemons, setRandomPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState("number_asc");
  const [totalPokemons, setTotalPokemons] = useState(0); // ポケモンの総数
  const [isLoadMore, setIsLoadMore] = useState(false);

  // プルダウンの選択が変わるたびに実行されるハンドラー
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    sortPokemons(e.target.value);
  };

  // 'もっと見る'をクリックしたときに実行される関数
  const handleLoadMoreClick = () => {
    setIsLoadMore(true);
  };

  // ポケモンの並び替えを行う関数
  const sortPokemons = (order) => {
    let sortedPokemons;
    switch (order) {
      case "number_asc":
        sortedPokemons = [...pokemons].sort((a, b) => a.id - b.id);
        break;
      case "number_desc":
        sortedPokemons = [...pokemons].sort((a, b) => b.id - a.id);
        break;
      case "name_asc":
        sortedPokemons = [...pokemons].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      // 他のソートオプションもここに追加
      default:
        sortedPokemons = [...pokemons];
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

  const swiperConfig = {
    spaceBetween: 100,
    slidesPerView: 3,
    loop: true,
    onSlideChange: () => console.log("slide change"),
    onSwiper: (swiper) => console.log(swiper),
  };

  return (
    <div>
      <Swiper {...swiperConfig}>
        {randomPokemons.map((pokemon) => (
          <SwiperSlide key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <div className="pokemon-slide p-10 w-full  bg-gray-200 rounded-3xl">
                <h2 className="font-bold text-xl mb-2">
                  {pokemon.name.toUpperCase()}
                </h2>
                <p className="text-xs text-gray-400">
                  #{pokemon.id.toString().padStart(4, "0")}
                </p>
                <img
                  className="w-1/2 block my-0 mx-auto"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <div className="pokemon-types">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className={`type ${type}`}>
                      {type.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="inner">
        <h1 className="text-3xl font-bold mt-8 mb-6">ポケモン一覧</h1>
        <select
          className="bg-gray-200 p-1 rounded-3xl mb-4"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="number_asc">番号の早い順</option>
          <option value="number_desc">番号の遅い順</option>
          <option value="name_asc">ABC順</option>
        </select>

        <PokemonList
          pokemons={
            isLoadMore
              ? pokemons
              : pokemons.slice(0, NUMBER_OF_INITIAL_POKEMONS)
          }
        />
        {!isLoadMore && (
          <button
            className="more-btn p-4 rounded-3xl border border-black block my-0 mx-auto"
            onClick={handleLoadMoreClick}
          >
            もっと見る
          </button>
        )}
      </div>
    </div>
  );
}

export default IndexPage;

/*
このページの役割

トップページの設計するところ
パーツを集めて作ったものを組み合わせる

*/

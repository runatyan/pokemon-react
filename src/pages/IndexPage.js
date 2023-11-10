// IndexPage.js

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetchPokemons, fetchRandomPokemons } from "../api";
import PokemonList from "../components/PokemonList";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";
import PokemonSpecies from "../features/pokemon/PokemonSpecies";

function IndexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [randomPokemons, setRandomPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState("number_asc");

  // プルダウンの選択が変わるたびに実行されるハンドラー
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    sortPokemons(e.target.value);
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
    const fetchRandomData = async () => {
      try {
        const randomData = await fetchRandomPokemons(5);
        setRandomPokemons(randomData);
      } catch (error) {
        setError(error);
      }
    };

    fetchRandomData();
  }, []);

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
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {randomPokemons.map((pokemon) => (
          <SwiperSlide key={pokemon.id}>
            <div className="pokemon-slide">
              <h2>{pokemon.name.toUpperCase()}</h2>
              <p>#{pokemon.id.toString().padStart(4, "0")}</p>
              <img src={pokemon.image} alt={pokemon.name} />
              <div className="pokemon-types">
                {pokemon.types.map((type, index) => (
                  <span key={index} className={`type ${type}`}>
                    {type.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>{" "}
      <div className="inner">
        <h1>ポケモン一覧</h1>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="number_asc">番号の早い順</option>
          <option value="number_desc">番号の遅い順</option>
          <option value="name_asc">ABC順</option>
          {/* 他のソートオプションのoptionをここに追加 */}
        </select>
        {/* ランダムなポケモンのスライダー */}

        <PokemonList pokemons={pokemons} />
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

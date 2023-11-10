// IndexPage.js

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import {
  fetchPokemons,
  fetchRandomPokemons,
  fetchTotalPokemonCount,
} from "../api";
import PokemonList from "../components/PokemonList";
import Loading from "../features/ui/Loading";
import ErrorMessage from "../features/ui/ErrorMessage";
import PokemonSpecies from "../features/pokemon/PokemonSpecies";

//ファーストページの内容を全て持つところ
function IndexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [randomPokemons, setRandomPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState("number_asc");
  const [displayLimit, setDisplayLimit] = useState(20); // 最初に表示するポケモンの数
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

  // ポケモンの総数を取得する
  useEffect(() => {
    fetchTotalPokemonCount();
  }, []);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      if (isLoadMore) {
        try {
          // 全てのポケモンを取得する
          const allPokemons = await fetchPokemons();
          setPokemons(allPokemons);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchAllPokemons();
  }, [isLoadMore]); // isLoadMoreが変更されたときにのみ実行

  const getTotalPokemonCount = async () => {
    // 名前を変更しました
    try {
      const totalCount = await fetchTotalPokemonCount(); // 正しい関数を呼び出し
      setTotalPokemons(totalCount);
    } catch (error) {
      setError(error);
    }
  };

  // useEffect内でこの新しい関数名を使用
  useEffect(() => {
    getTotalPokemonCount();
  }, []);

  // 「もっと見る」ボタンのクリックイベント
  const handleLoadMore = async () => {
    try {
      const morePokemons = await fetchPokemons(totalPokemons, displayLimit);
      setPokemons(morePokemons);
      setDisplayLimit(totalPokemons); // 表示制限を総数に更新する
    } catch (error) {
      setError(error);
    }
  };

  // ポケモンを取得する関数を変更
  const fetchData = async (limit) => {
    try {
      // ポケモンを取得して状態を更新する
      const result = await fetchPokemons(limit);
      setPokemons(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  // useEffectを修正して、指定された数だけポケモンを取得する
  useEffect(() => {
    fetchData(displayLimit);
  }, [displayLimit]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

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
        </select>

        <PokemonList pokemons={isLoadMore ? pokemons : pokemons.slice(0, 20)} />
        {!isLoadMore && (
          <button onClick={handleLoadMoreClick}>もっと見る</button>
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

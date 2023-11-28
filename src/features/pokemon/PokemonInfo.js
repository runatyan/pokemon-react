// features/pokemon/PokemonInfo.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination } from "swiper";

const PokemonInfo = ({ pokemon }) => {
  const id = pokemon.id.toString().padStart(4, "0");
  const name = pokemon.name;
  const types = pokemon.types;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const height = pokemon.height;
  const weight = pokemon.weight;
  const entries = pokemon.species.flavor_text_entries;
  const version = pokemon.version;

  return (
    <div>
      <h2 className="text-4xl font-bold my-4">{name}</h2>
      <p className="text-gray-400 text-lg mb-7">#{id}</p>
      <div className="flex justify-between mb-10">
        <img
          className="w-2/6 bg-gray-200 rounded-3xl"
          src={image}
          alt={pokemon.name}
        />
        <div className="pokemon-contents w-3/5 p-5 rounded-3xl bg-gray-200">
          <div>
            <p className="mb-3">分類: {pokemon.species.genera[0].genus}</p>
            <div className="pokemon-types mb-3">
              {types.map((type, index) => (
                <span key={index} className={`type ${type}`}>
                  {type.toUpperCase()}
                </span>
              ))}
            </div>
            <p className="mb-3">高さ:{height / 10}m</p>
            <p className="mb-3">重さ:{weight / 10}kg</p>
            <div className="pokemon-ver mb-3">
              {version.map((gameIndex, index) => (
                <span key={index}>{gameIndex}、</span>
              ))}
            </div>
          </div>
          <Swiper
            className="bg-gray-50 p-3 "
            spaceBetween={50}
            slidesPerView={1}
          >
            {entries.map((entry, index) => (
              <SwiperSlide key={index} className="pokemon-slide">
                <p key={index}>{entry.flavor_text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;

// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";
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
      <h2>{name}</h2>
      <p>#{id}</p>
      <div className="row">
        <img className="pokemon-img" src={image} alt={pokemon.name} />
        <div className="pokemon-contents">
          <div>
            <p>分類: {pokemon.species.genera[0].genus}</p>
            <div className="pokemon-types">
              {types.map((type, index) => (
                <span key={index} className={`type ${type}`}>
                  {type.toUpperCase()}
                </span>
              ))}
            </div>
            <p>高さ:{height / 10}m</p>
            <p>重さ:{weight / 10}kg</p>
            <div className="pokemon-ver">
              {version.map((gameIndex, index) => (
                <span key={index}>{gameIndex}、</span>
              ))}
            </div>
          </div>
          <Swiper spaceBetween={50} slidesPerView={1}>
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

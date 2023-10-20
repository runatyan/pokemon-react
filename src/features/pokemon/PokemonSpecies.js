// PokemonSpecies.js

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function PokemonSpecies({ pokemon }) {
  const [speciesText, setSpeciesText] = useState([]);

  useEffect(() => {
    getSpeciesText(pokemon.id).then((data) => {
      setSpeciesText(data);
    });
  }, [pokemon.id]);

  return (
    <div>
      <Swiper slidesPerView={1} spaceBetween={30}>
        {speciesText.map((text) => (
          <SwiperSlide key={text}>{text}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PokemonSpecies;

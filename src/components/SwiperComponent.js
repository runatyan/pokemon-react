// SwiperComponent.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

function SwiperComponent({ randomPokemons }) {
  const swiperConfig = {
    spaceBetween: 100,
    slidesPerView: 3,
    loop: true,
    onSlideChange: () => console.log("slide change"),
    onSwiper: (swiper) => console.log(swiper),
  };

  return (
    <Swiper {...swiperConfig}>
      {randomPokemons.map((pokemon) => (
        <SwiperSlide key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}`}>
            <div className="pokemon-slide p-10 w-full bg-gray-200 rounded-3xl">
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
  );
}

export default SwiperComponent;

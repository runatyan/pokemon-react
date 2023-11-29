// PokemonItem.js
//この内容はListへ
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  return (
    <div className="pokemon-item mb-14">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img
          className="t-pokemon_img w-full p-1 bg-gray-200 rounded-3xl"
          src={pokemon.image}
          alt={pokemon.name}
        />
        <p className="t-pokemon_number text-xs text-gray-400">{`#${pokemon.id
          .toString()
          .padStart(4, "0")}`}</p>
        <p className="t-poekmon_name mt-1 text-2xl font-bold mb-2">
          {pokemon.name}
        </p>
        <div className="pokemon-types ">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type.toUpperCase()}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default PokemonItem;

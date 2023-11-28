// PokemonItem.js
//この内容はListへ
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  return (
    <div className="pokemon-item">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img className="t-pokemon_img" src={pokemon.image} alt={pokemon.name} />
        <p className="t-pokemon_number p-5">{`#${pokemon.id
          .toString()
          .padStart(4, "0")}`}</p>
        <p className="t-poekmon_name">{pokemon.name}</p>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type.toUpperCase()}
            </span>
          ))}
        </div>
      </Link>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Click me
      </button>
    </div>
  );
}

export default PokemonItem;

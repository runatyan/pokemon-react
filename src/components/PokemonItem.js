// PokemonItem.js
//この内容はListへ
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  return (
    <div className="pokemon-item">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.name}</p>
        <p>{`#${pokemon.id.toString().padStart(4, "0")}`}</p>
        <div className="pokemon-types">
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

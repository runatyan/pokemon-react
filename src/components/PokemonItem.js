// PokemonItem.js
//この内容はListへ
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  //console.log(pokemon.types[0].type.name);
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <p>{pokemon.id}</p>
    </Link>
  );
}

// function PokemonItem({ pokemon }) {
//   const id = pokemon.id;

//   return (
//     <Link to={`/pokemon/${id}`}>
//       <img src={pokemon.image} alt={pokemon.name} />
//       <p>{pokemon.name}</p>
//       <p>{id}</p>
//       <p>{pokemon.types[0].type.name}</p>
//     </Link>
//   );
// }

export default PokemonItem;

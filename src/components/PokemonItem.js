// PokemonItem.js

import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  return <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>;
}

export default PokemonItem;

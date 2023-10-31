// PokemonItem.js
//この内容はListへ
import { useEffect, useState } from "react";
import { fetchPokemons } from "../api";
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  // const [type, setType] = useState();

  // useEffect(() => {
  //   fetchPokemons(pokemon.id).then((data) => {
  //     setType(data.types[0].type.name);
  //   });
  // }, [pokemon.id]);

  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <p>{pokemon.id}</p>
      <p>{pokemon.type}</p>
    </Link>
  );
}

export default PokemonItem;

// PokemonItem.js
//この内容はListへ
import { useEffect, useState } from "react";
import { fetchPokemons } from "../api";
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  const [type, setType] = useState();

  useEffect(() => {
    fetchPokemons(pokemon.id).then((data) => {
      setType(data.types[0].type.name);
    });
  }, [pokemon.id]);
  //console.log(pokemon);
  //console.log(pokemon.types[0].type.name);
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <p>{pokemon.id}</p>
      <p>{type}</p>
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

// // export default PokemonItem;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchPokemon } from "../api";

// function PokemonItem({ pokemon }) {
//   const [type, setType] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // ポケモンの詳細情報を取得し、タイプ情報をセットする
//     const fetchData = async () => {
//       try {
//         const data = await fetchPokemon(pokemon.id);
//         setType(data.types[0].type.name);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [pokemon.id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Link to={`/pokemon/${pokemon.name}`}>
//       <img src={pokemon.image} alt={pokemon.name} />
//       <p>{pokemon.name}</p>
//       <p>{pokemon.id}</p>
//       <p>{type}</p>
//     </Link>
//   );
// }

// export default PokemonItem;

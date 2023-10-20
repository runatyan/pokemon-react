// // PokemonInfo.js

// import React from "react";

// import Badge from "../components/Badge";

// function PokemonInfo({ pokemon }) {
//   return (
//     <div className="pokemon-info">
//       <img src={pokemon.image} alt={pokemon.name} />

//       <h2>{pokemon.name}</h2>

//       <Badge>{`#${pokemon.id}`}</Badge>

//       {pokemon.types.map((type) => (
//         <Badge key={type} type={type}>
//           {type}
//         </Badge>
//       ))}

//       <p>Height: {pokemon.height}m</p>
//       <p>Weight: {pokemon.weight}kg</p>
//     </div>
//   );
// }

// export default PokemonInfo;

// features/pokemon/PokemonInfo.js
import React from "react";
import Badge from "../../components/Badge";

const PokemonInfo = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <Badge name={pokemon.types[0].type.name} />
    </div>
  );
};

export default PokemonInfo;

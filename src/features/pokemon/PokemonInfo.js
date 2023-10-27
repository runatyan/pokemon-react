// features/pokemon/PokemonInfo.js

import React from "react";
import Badge from "../../components/Badge";

// const PokemonInfo = ({ pokemon }) => {
//   return (
//     <div>
//       <h2>{pokemon.name}</h2>
//       <Badge name={pokemon.types[0].type.name} />
//     </div>
//   );
// };
const PokemonInfo = ({ pokemon }) => {
  const name = pokemon.name;
  const type = pokemon.types[0];

  return (
    <div>
      <h2>{name}</h2>
      <Badge name={type} />
    </div>
  );

  // const PokemonInfo = () => {
  //   return (
  //     <div>
  //       <h2>{name}</h2>
  //       <Badge name={type} />
  //     </div>
  //   );
  // };
};

export default PokemonInfo;

// PokemonNav.js

import { Link } from "react-router-dom";

function PokemonNav({ pokemon }) {
  const prevLink = `/pokemon/${pokemon.prev}`;
  const nextLink = `/pokemon/${pokemon.next}`;

  return (
    <div className="pokemon-nav">
      <Link to={prevLink}>前のポケモン</Link>

      <Link to={nextLink}>次のポケモン</Link>
    </div>
  );
}

export default PokemonNav;

/*
このページの役割

詳細ページの前後に飛ばすボタン
このパーツはPokemonPage.jsへ

*/

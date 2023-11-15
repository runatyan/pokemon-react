// PokemonNav.js

import { Link } from "react-router-dom";

function PokemonNav({ pokemon }) {
  const prevLink = pokemon.prev ? `/pokemon/${pokemon.prev}` : null;
  const nextLink = pokemon.next ? `/pokemon/${pokemon.next}` : null;

  return (
    <div className="pokemon-nav">
      {prevLink && <Link to={prevLink}>＜前のポケモン</Link>}
      {nextLink && <Link to={nextLink}>次のポケモン＞</Link>}
    </div>
  );
}

export default PokemonNav;

/*
このページの役割

詳細ページの前後に飛ばすボタン
このパーツはPokemonPage.jsへ

*/

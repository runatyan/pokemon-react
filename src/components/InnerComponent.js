// InnerComponent.js
import PokemonList from "./PokemonList";

function InnerComponent({
  pokemons,
  sortOrder,
  handleSortChange,
  isLoadMore,
  handleLoadMoreClick,
  NUMBER_OF_INITIAL_POKEMONS,
}) {
  return (
    <div className="inner">
      <h1 className="text-3xl font-bold mt-8 mb-6">ポケモン一覧</h1>
      <select
        className="bg-gray-200 p-1 rounded-3xl mb-4"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="number_asc">番号の早い順</option>
        <option value="number_desc">番号の遅い順</option>
        <option value="name_asc">ABC順</option>
      </select>

      <PokemonList
        pokemons={
          isLoadMore ? pokemons : pokemons.slice(0, NUMBER_OF_INITIAL_POKEMONS)
        }
      />

      {!isLoadMore && (
        <button
          className="more-btn p-4 rounded-3xl block my-0 mx-auto border border-black"
          onClick={handleLoadMoreClick}
        >
          もっと見る
        </button>
      )}
    </div>
  );
}

export default InnerComponent;

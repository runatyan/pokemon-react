// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RenderPokemonsHomePage } from "./components/common/pokemon";
import PokemonsPage from "./pages/homePage";
import Login from './pages/Login';
import PokemonInfo from './components/common/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/HomePage" element={<RenderPokemonsHomePage />} />
        
        <Route path="/pokemon/:name" element={<PokemonInfo />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

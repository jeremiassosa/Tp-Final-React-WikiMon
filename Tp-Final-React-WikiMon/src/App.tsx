import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonInfo from './components/common/user';
import { RenderPokemonsHomePage } from './services/RenderPokemonHomePage';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />

        <Route path="/" element={<RenderPokemonsHomePage/>} />
        
        <Route path="/pokemon/:name" element={<PokemonInfo />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

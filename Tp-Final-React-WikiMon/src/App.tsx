import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RenderPokemonsHomePage } from "./components/common/pokemon";
import PokemonsPage from "./pages/homePage";
import Login from './pages/Login';
import PokemonInfo from './components/common/User';
import { PokemonTabs } from './pages/favsAndDeleted';
import SettingsWithProvider from './components/common/settingsWithProvider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/Login" element={<Login />} />
        
        <Route path="/HomePage" element={<RenderPokemonsHomePage />} />
        
        <Route path="/pokemon/:name" element={<PokemonInfo />} />

        <Route path="/Favoritos/Y/Eliminados" element={<PokemonTabs />} />

        <Route path="/Settings" element={<SettingsWithProvider/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

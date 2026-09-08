import PokemonsPage from "./pages/homePage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PokemonInfo from './components/common/User';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/HomePage" element={<PokemonsPage/>} />
        
        <Route path="/pokemon/:name" element={<PokemonInfo />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

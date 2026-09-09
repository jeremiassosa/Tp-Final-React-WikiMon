import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RenderPokemonsHomePage } from "./components/common/pokemon";
import Login from './pages/Login';
import PokemonInfo from './components/common/IndividualPokemon';
import { PokemonTabs } from './pages/favsAndDeleted';
import SettingsWithProvider from './components/common/settingsWithProvider';
import { useLoginForm } from './store/AuthStore'; 


const ProtectedRoute = () => {
  const isAuthenticated = useLoginForm((state) => state.isAuthenticated);


  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }


  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/HomePage" replace />} />

        <Route path="/Login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/HomePage" element={<RenderPokemonsHomePage />} />
          <Route path="/pokemon/:name" element={<PokemonInfo />} />
          <Route path="/Favourites/and/Eliminated" element={<PokemonTabs />} />
          <Route path="/Settings" element={<SettingsWithProvider />} />
        </Route>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import PokemonsPage from "./pages/homePage"
import Login from './pages/Login';
import { RenderPokemonsHomePage } from './services/RenderPokemonHomePage'

function App() {
  return (
    <>
      <RenderPokemonsHomePage />
      <Login />
    </>
  )
}

export default App




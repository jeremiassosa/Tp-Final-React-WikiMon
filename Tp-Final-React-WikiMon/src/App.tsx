import './App.css'
import PokemonInfo from './components/common/user'
import { RenderPokemonsHomePage } from './services/RenderPokemonHomePage'

function App() {
  return(
    <>
      <RenderPokemonsHomePage/>
      <PokemonInfo/>
    </>
  )
}

export default App




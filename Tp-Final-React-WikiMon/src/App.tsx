import './App.css'
import PokemonInfo from './components/common/user'


function App() {
  return(

    <>
    <PokemonInfo url='https://pokeapi.co/api/v2/pokemon/pikachu'></PokemonInfo>
      <PokemonInfo url='https://pokeapi.co/api/v2/pokemon/raichu'></PokemonInfo>
            <PokemonInfo url='https://pokeapi.co/api/v2/pokemon/ratata'></PokemonInfo>


    </>
  )
}

export default App




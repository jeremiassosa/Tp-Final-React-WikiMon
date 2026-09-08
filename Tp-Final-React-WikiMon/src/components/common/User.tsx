import useFetch from '../../hooks/useFetch';
import type { PokeApiListResponse } from '../../types/pokemon';




const PokemonInfo = () => {
  const stored = localStorage.getItem('pokemonSeleccionado');
  const pokemon = stored ? JSON.parse(stored) : null;
  console.log(pokemon);

  
  return (
    <div>
      <h2>Información del Pokémon</h2>
      {pokemon && (
        <div>
          <p><strong>Nombre:</strong> {pokemon.name}</p>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>

          <ul>
            {pokemon.stats.map((item, index) => (
              <li key={index}>
                <strong>{item.stat.name}:</strong> {item.base_stat}
                
              </li>
            ))}
          </ul>
          <ul>
            {pokemon.types.map((item, index) => {
              console.log('works?s')
              return (              <li key={index}>
                <strong>{item.type.name}</strong>
              </li>)
            }

            )}
          </ul>
            <ul>
            {pokemon.abilities.map((item, index) => (
              <li key={index}>
                <strong>{item.ability.name}</strong>
                {item.is_hidden && <span> (oculta)</span>}
              </li>
            ))}
          </ul>




        </div>
      )}
    </div>
  );
};

export default PokemonInfo;
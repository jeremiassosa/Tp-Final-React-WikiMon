import useFetch from '../../hooks/useFetch';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect } from 'react';
import type { PokeApiResponse } from '../../types/pokemon';
import type { PokemonUrl } from '../../types/PokemonUrl';



const PokemonInfo = ({ url }: PokemonUrl) => {
  const { data, loading, error } = useFetch(url);
  const [cachedPokemon, setCachedPokemon] = useLocalStorage<PokeApiResponse | null>("pokemon", null);
  const pokemon = data as PokeApiResponse | null;

  useEffect(() => {
    if (pokemon) {
      setCachedPokemon(pokemon);
    }
  }, [pokemon, setCachedPokemon]);

  if (loading) {
    return <p>Cargando Pokémon...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

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
        </div>
      )}
    </div>
  );
};

export default PokemonInfo;

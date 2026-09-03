import React from 'react';
import useFetch from '../../hooks/useFetch';
import type { PokeApiResponse } from '../../types/pokemon'; 




const PokemonInfo = () => {
const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon/pikachu');

    if (loading) {
    return <p>Cargando Pokémon...</p>;
    }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  const pokemon = data as PokeApiResponse| null;

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
        </ul>        </div>
    )}
    </div>
  );
};

export default PokemonInfo;

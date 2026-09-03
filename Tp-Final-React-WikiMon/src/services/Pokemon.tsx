import React, { useEffect, useState } from 'react';

interface PokemonListItem {
  name: string;
  url: string;
}
interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export const RenderPokemonsHomePage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset${pokemonList.length}=&limit=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo conectar con la API');
        }
        return response.json();
      })
      .then((data: PokeApiListResponse) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error inesperado');
        }
        setLoading(false);
      });
  }, []);


  


  if (loading) return <p>Cargando Pokémon...</p>;
  if (error) return <p>Error: {error}</p>;
  if (pokemonList.length === 0) return <p>No se encontraron datos.</p>;

  return (
    <div>
      <h2>Lista de Pokémon</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <p>{pokemon.name}</p>

            <p>{pokemon.url}</p>
          </li>
        ))}
      </ul>
      {/* cargar mas pokemones de 20 en 20 */}
      <button> 
      more pokemon
    </button>
    </div>
  );
};

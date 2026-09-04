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
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMorePokemon(0);
  }, []);
  
  function fetchMorePokemon(currentCountPokemon: number) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${currentCountPokemon}&limit=20`)
      .then((response) => {
          if (!response.ok) {
              throw new Error('No se pudo conectar con la API');
            }
            return response.json();
        })
        .then((data: PokeApiListResponse) => {
            setPokemonList((currentList) => {
              const newPokemons = data.results.filter(
                (newPokemon) => !currentList.some((oldPokemon) => oldPokemon.name === newPokemon.name)
              );
              return [...currentList, ...newPokemons];
            });
            setLoading(false);
        })
        .catch((err) => {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error');
            }
            setLoading(false);
        });
    }

  if (error) return <p>Error: {error}</p>;
  if (loading && pokemonList.length === 0) return <p>Cargando Pokémon...</p>;
  if (pokemonList.length === 0) return <p>No se encontraron datos.</p>;

  return (
    <div>
      <h3>Lista de Pokémon</h3>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <p>{pokemon.name}</p>
            <p>{pokemon.url}</p>
          </li>
        ))}
      </ul>

      <button onClick={() => fetchMorePokemon(pokemonList.length)} disabled={loading}>
        {loading ? 'Cargando...' : 'More pokemon'}
      </button>
    </div>
  );
};

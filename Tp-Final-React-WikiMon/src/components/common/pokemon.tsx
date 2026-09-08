import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../services/pokeAPI';
import { PokemonCard } from './PokemonCard';
import type { PokemonListItem } from '../../types/pokemon';
import { useNavigate } from 'react-router-dom';


export const RenderPokemonsHomePage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate(); 


  useEffect(() => {
    fetchMorePokemon(0);
  }, []);
  
  function fetchMorePokemon(currentCountPokemon: number) {
    setLoading(true);
    fetchPokemonList(currentCountPokemon)
      .then((data) => {
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

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <p>Error: {error}</p>;
  if (loading && pokemonList.length === 0) return <p>Cargando Pokémon...</p>;
  if (pokemonList.length === 0) return <p>No se encontraron datos.</p>;

  return (
    <div className="pokedexHome">
      <div className="center">
              <button onClick={()=>navigate(-1)}>REGRESAR ATRAS</button>

        <h3>Pokémons</h3>
      </div>

      <div className="center searchContainer">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBar"
        />
      </div>

      <section className="pokemonContainer">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </section>

      {searchTerm === '' && (
        <div className="center">
          <button
            className='loadMore'
            onClick={() => fetchMorePokemon(pokemonList.length)}
            disabled={loading}
          >
            {loading ? "Cargando..." : "More pokemon"}
          </button>
        </div>
      )}
    </div>
  );
};

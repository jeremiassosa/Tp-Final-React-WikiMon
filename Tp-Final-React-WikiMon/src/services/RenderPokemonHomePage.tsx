import React, { useEffect, useState } from 'react';

interface PokemonListItem {
  name: string,
  url: string,
}

interface PokeApiListResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: PokemonListItem[],
}

interface PokeApiFormResponse {
  id: number,
  name: string,
  sprites: {
    front_default: string;
  };
  types: {
    slot: number,
    type: {
      name: string,
      url: string,
    };
  }[];
}
const PokemonCard: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  const [details, setDetails] = useState<PokeApiFormResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar detalle');
        return response.json();
      })
      .then((data: PokeApiFormResponse) => {
        setDetails(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [url]);

   useEffect(() => {
    if (!details) return;

    const savedFavorites = localStorage.getItem('pokemonFavorites');
    
    let favoritesArray: number[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (liked) {
      if (!favoritesArray.includes(details.id)) {
        favoritesArray.push(details.id);
      }
    } else {
      favoritesArray = favoritesArray.filter((favId) => favId !== details.id);
    }
    localStorage.setItem('pokemonFavorites', JSON.stringify(favoritesArray));
  }, [liked, details]);

  if (loading) return <li>Cargando {name}...</li>;
  if (!details) return <li>No se pudo cargar {name}</li>;

  
  return (
    <button>
      <button
          type="button"
          className="counter"
          onClick={() => setLiked((liked) => !liked) }
        >
            {liked ? 
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
             : 
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>}
        </button>
      <p><strong>Id:</strong> {details.id}</p>
      <img src={details.sprites.front_default} alt={details.name} />
      <p><strong>Name:</strong> {details.name}</p>
      <p>
        <strong>Types:</strong> {details.types.map((types) => types.type.name).join(', ')}
      </p>
    </button>
  );
};

export const RenderPokemonsHomePage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMorePokemon(0);
  }, []);
  
  function fetchMorePokemon(currentCountPokemon: number) {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentCountPokemon}&limit=20`)
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
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </ul>

      <button onClick={() => fetchMorePokemon(pokemonList.length)} disabled={loading}>
        {loading ? 'Cargando...' : 'More pokemon'}
      </button>
    </div>
  );
};

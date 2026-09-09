import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPokemonDetails } from '../services/pokeAPI';
import type { PokeApiFormResponse } from '../types/pokemon';

const STORAGE_KEYS = {
  favoritos: 'pokemonFavorites',
  eliminados: 'pokemonDeleted',
} as const;

export const PokemonTabs: React.FC = () => {
  const [tabActiva, setTabActiva] = useState<'favoritos' | 'eliminados'>('favoritos');
  const [pokemons, setPokemons] = useState<PokeApiFormResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
  
      const Theme = localStorage.getItem('theme')
  
      if (Theme) {
        document.body.classList.add('blackMode')
        document.body.classList.remove('whiteMode')
      }
      else {
        document.body.classList.add('whiteMode')
        document.body.classList.remove('blackMode')
      }
    }, [])

  useEffect(() => {
    const storageKey = STORAGE_KEYS[tabActiva];
    const saved = localStorage.getItem(storageKey);
    const ids: number[] = saved ? JSON.parse(saved) : [];

    if (ids.length === 0) {
      setPokemons([]);
      return;
    }

    setLoading(true);
    Promise.all(
    ids.map((id) => fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`))
    )
    .then((results) => setPokemons(results))
    
    .catch((err) => console.error(err))
    
}, [tabActiva]);


function quitarDeLista(id: number) {
    const storageKey = STORAGE_KEYS[tabActiva];
    const saved = localStorage.getItem(storageKey);
    const ids: number[] = saved ? JSON.parse(saved) : [];
    const nuevos = ids.filter((existingId) => existingId !== id);
    localStorage.setItem(storageKey, JSON.stringify(nuevos));
    setPokemons((prev) => prev.filter((p) => p.id !== id));

}

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)}>REGRESAR ATRAS</button>

        <button
          type="button"
          onClick={() => setTabActiva('favoritos')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: tabActiva === 'favoritos' ? '#EA3323' : '#f0f0f0',
            color: tabActiva === 'favoritos' ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          ⭐ Favoritos
        </button>

        <button
          type="button"
          onClick={() => setTabActiva('eliminados')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: tabActiva === 'eliminados' ? '#EA3323' : '#f0f0f0',
            color: tabActiva === 'eliminados' ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          🗑️ Eliminados
        </button>
      </div>

      {!loading && pokemons.length === 0 && <p>No hay pokemon en esta lista.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <img
              src={pokemon.sprites.other.showdown.front_default}
              alt={pokemon.name}
              style={{ width: '90px', height: '90px' }}
            />
            <p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{pokemon.name}</p>
            <button onClick={() => quitarDeLista(pokemon.id)}>
              {tabActiva === 'favoritos' ? 'Quitar de favoritos' : 'Restaurar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
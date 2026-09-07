import type { PokeApiListResponse, PokeApiFormResponse } from '../types/pokemon';

export const fetchPokemonList = (offset: number, limit: number = 20): Promise<PokeApiListResponse> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo conectar con la API');
      return response.json();
    });
};

export const fetchPokemonDetails = (url: string): Promise<PokeApiFormResponse> => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Error al cargar detalle');
      return response.json();
    });
};

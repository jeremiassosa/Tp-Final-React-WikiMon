import React, { useEffect, useState } from 'react';
import type { PokeApiFormResponse } from '../../types/pokemon';
import { fetchPokemonDetails } from '../../services/pokeAPI';
import { useNavigate } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  url: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [details, setDetails] = useState<PokeApiFormResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPokemonDetails(url)
      .then((data) => {
        if (!isMounted) return;
        setDetails(data);

        const savedFavorites = localStorage.getItem('pokemonFavorites');
        const favoritesArray: number[] = savedFavorites ? JSON.parse(savedFavorites) : [];
        const savedDeleted = localStorage.getItem('pokemonDeleted');
        const deletedArray: number[] = savedDeleted ? JSON.parse(savedDeleted) : [];

        setLiked(favoritesArray.includes(data.id));
        setDeleted(deletedArray.includes(data.id));
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!details) return;

    const savedFavorites = localStorage.getItem('pokemonFavorites');
    let favoritesArray: number[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (!liked) {
      if (!favoritesArray.includes(details.id)) {
        favoritesArray.push(details.id);
      }
    } else {
      favoritesArray = favoritesArray.filter((favId) => favId !== details.id);
    }

    localStorage.setItem('pokemonFavorites', JSON.stringify(favoritesArray));
    setLiked(!liked);
  };

  const handleToggleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!details) return;

    const savedDeleted = localStorage.getItem('pokemonDeleted');
    let deleteArray: number[] = savedDeleted ? JSON.parse(savedDeleted) : [];

    if (!deleted) {
      if (!deleteArray.includes(details.id)) {
        deleteArray.push(details.id);
      }
    } else {
      deleteArray = deleteArray.filter((deleteId) => deleteId !== details.id);
    }

    localStorage.setItem('pokemonDeleted', JSON.stringify(deleteArray));
    setDeleted(!deleted);
  };

  const handleCardClick = () => {
    if (!details) return;
    localStorage.setItem("pokemonSeleccionado", JSON.stringify(details));
    navigate(`/pokemon/${name}`);
  };

  }, [deleted, details]);

  if (loading) return <li>Cargando {name}...</li>;
  if (!details) return <li>No se pudo cargar {name}</li>;
  if (deleted) return null;

  return (
    <div className="pokemonCard" onClick={handleCardClick}>
      <button
        className='deletedButton'
        type="button"
        onClick={handleToggleDelete}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M200-440v-80h560v80H200Z"/></svg>
      </button>

      <button
        className='favoriteButton'
        type="button"
        onClick={handleToggleLike}
      >
        {liked ?
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
        }
      </button>
      <p><strong>Id:</strong> {details.id}</p>
      <img
        className='pokemonImage'
        src={details.sprites.other.showdown.front_default}
        alt={details.name}
      />
      <p><strong>Name:</strong> {details.name}</p>
      <div style={{ textTransform: 'uppercase' }}>
      {details.types.map((countType) => (
        <span className={`type ${countType.type.name}`}>
          {countType.type.name}
        </span>
      ))}
    </div>
    </div>
  );
};
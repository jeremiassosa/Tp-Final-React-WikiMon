import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/IndividualPokemon.css";

function collectFrontSprites(sprites: Record<string, any>): string[] {
  const result: string[] = [];
  const showdown = sprites?.other?.showdown;
  if (showdown) {
    if (showdown.front_default) result.push(showdown.front_default);
    for (const key in showdown) {
      if (key !== 'front_default' && key.startsWith('front') && typeof showdown[key] === 'string' && showdown[key]) {
        result.push(showdown[key]);
      }
    }
  }
  function walk(obj: Record<string, any>) {
    for (const key in obj) {
      const value = obj[key];
      if (key === 'showdown') continue; 
      if (typeof value === 'string' && key.startsWith('front') && value) {
        result.push(value);
      } else if (value && typeof value === 'object') {
        walk(value);
      }
    }
  }
  walk(sprites);
  return [...new Set(result)];
}

const IndividualPokemon = () => {
  const stored = localStorage.getItem('pokemonSeleccionado');
  const pokemon = stored ? JSON.parse(stored) : null;
  const [typeDetails, setTypeDetails] = useState({});
  const [spriteIndex, setSpriteIndex] = useState(0);
  const navigate = useNavigate();

  const reproducirGrito = () => {
    if (pokemon && pokemon.cries && pokemon.cries.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play().catch((err) => console.error("Error al reproducir audio:", err));
    } else {
      alert("Este Pokémon no tiene un grito disponible");
    }
  };

  useEffect(() => {
    if (!pokemon) return;
    pokemon.types.forEach((item) => {
      fetch(item.type.url).then((res) => res.json())
        .then((data) => {
          setTypeDetails((prev) => ({ ...prev, [item.type.name]: data }));
        })
        .catch((err) => console.error(err));
    });
  }, [pokemon?.name]);

  useEffect(() => {
    setSpriteIndex(0);
  }, [pokemon?.name]);

  const sprites = pokemon ? collectFrontSprites(pokemon.sprites) : [];

  function prevSprite() {
    setSpriteIndex((i) => (i === 0 ? sprites.length - 1 : i - 1));
  }

  function nextSprite() {
    setSpriteIndex((i) => (i === sprites.length - 1 ? 0 : i + 1));
  }

  const primaryType = pokemon?.types?.[0]?.type?.name || "";

  return (
    <div className={`screen-wrapper ${primaryType}`}>
      <div className="pokemon-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>◀ REGRESAR ATRÁS</button>
        <h2>Information about the pokemon</h2>
        {pokemon && (
          <div>
            <p className="pokemon-name">{pokemon.name}</p>
            {pokemon.cries && (
              <button className="cry-button" onClick={reproducirGrito}>
                Listen Cry 🔊
              </button>
            )}
            <div className="sprite-carousel">
              <button className="carousel-btn" onClick={prevSprite}>◀</button>
              <img 
                className="sprite-img"
                src={sprites[spriteIndex]} 
                alt={`Sprite de ${pokemon.name}`} 
              />
              <button className="carousel-btn" onClick={nextSprite}>▶</button>
            </div>
            <p className="sprite-counter">{spriteIndex + 1} / {sprites.length}</p>
            <div className="pokemon-meta">
              <p><strong>ID:</strong> #{pokemon.id}</p>
              <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            </div>
            <h3>Stats</h3>
            <ul className="stats-list">
              {pokemon.stats.map((item, index) => {
                const percentage = Math.min((item.base_stat / 150) * 100, 100);
                return (
                  <li key={`stat-${index}`}>
                    <span className="stat-name">{item.stat.name}</span>
                    <span className="stat-value">{item.base_stat}</span>
                    <div className="stat-bar-container">
                      <div className="stat-bar" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <h3>Tipos</h3>
            <div className="types-container">
              {pokemon.types.map((item, index) => {
                const details = typeDetails[item.type.name];
                const weaknesses = details
                  ? details.damage_relations.double_damage_from.map((w) => w.name).join(', ')
                  : 'Cargando...';
                return (
                  <div className="type-block" key={`type-block-${index}`}>
                    <p className="type-title">TYPE</p>
                    <div className="type-name">{item.type.name}</div>
                    <p className="type-title">WEAK AGAINST</p>
                    <div className="weakness-list">{weaknesses}</div>
                  </div>
                );
              })}
            </div>
            <h3>Abilities</h3>
            <ul className="abilities-list">
              {pokemon.abilities.map((item, index) => (
                <li key={`ability-${index}`}>
                  {item.ability.name}
                  {item.is_hidden && <span> (oculta)</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualPokemon;

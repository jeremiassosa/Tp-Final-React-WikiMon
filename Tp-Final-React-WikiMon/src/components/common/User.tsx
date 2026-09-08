import React, { useEffect, useState } from 'react';

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

const PokemonInfo = () => {
  const stored = localStorage.getItem('pokemonSeleccionado');
  const pokemon = stored ? JSON.parse(stored) : null;

  const [typeDetails, setTypeDetails] = useState({});
  const [spriteIndex, setSpriteIndex] = useState(0);
  

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
        .then((data) => {setTypeDetails((prev) => ({ ...prev, [item.type.name]: data }));
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

  return (
    <div>
      <h2>Information about the pokemon</h2>
      {pokemon && (
        <div>
          <p><strong>Name:</strong> {pokemon.name}</p>
          
          {pokemon.cries && (
            <button 
              onClick={reproducirGrito} 
              style={{ margin: '10px 0', padding: '5px 10px', cursor: 'pointer' }}
            >
              Listen Cry
            </button>
          )}

          <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <button onClick={prevSprite}>◀</button>
            <img 
              src={sprites[spriteIndex]} 
              alt={`Sprite de ${pokemon.name}`} 
              style={{ width: '150px', height: '150px', objectFit: 'contain' }}
            />
            <button onClick={nextSprite}>▶</button>
          </div>
          <p>{spriteIndex + 1} / {sprites.length}</p>

          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>

          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((item, index) => (
              <li key={`stat-${index}`}>
                <strong>{item.stat.name}:</strong> {item.base_stat}
              </li>
            ))}
          </ul>

          <h3>Tipos</h3>
          <ul>
            {pokemon.types.map((item, index) => {
              const details = typeDetails[item.type.name];
              const weaknesses = details
                ? details.damage_relations.double_damage_from.map((w) => w.name).join(', ')
                : 'Cargando...';

              return (
                <React.Fragment key={`type-block-${index}`}>
                  <p><strong>TYPE:</strong></p>
                  <li>{item.type.name}</li>

                  <p><strong>WEAK AGAINST:</strong></p>
                  <li>{weaknesses}</li>
                </React.Fragment>
              );
            })}
          </ul>

          <h3>Habilities</h3>
          <ul>
            {pokemon.abilities.map((item, index) => (
              <li key={`ability-${index}`}>
                <strong>{item.ability.name}</strong>
                {item.is_hidden && <span> (oculta)</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonInfo;
import React, { useEffect, useState } from 'react';

const PokemonInfo = () => {
  const stored = localStorage.getItem('pokemonSeleccionado');
  const pokemon = stored ? JSON.parse(stored) : null;

  const [typeDetails, setTypeDetails] = useState({});

  useEffect(() => {
    if (!pokemon) return;

    pokemon.types.forEach((item) => {
      fetch(item.type.url).then((res) => res.json())
        .then((data) => {setTypeDetails((prev) => ({ ...prev, [item.type.name]: data }));
        })
        .catch((err) => console.error(err));
    });
  }, [pokemon?.name]);

  return (
    <div>
      <h2>Información del Pokémon</h2>
      {pokemon && (
        <div>
          <p><strong>Nombre:</strong> {pokemon.name}</p>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>

          <h3>Estadísticas</h3>
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
                  <p><strong>TIPO:</strong></p>
                  <li>{item.type.name}</li>

                  <p><strong>DEBIL CONTRA:</strong></p>
                  <li>{weaknesses}</li>
                </React.Fragment>
              );
            })}
          </ul>

          <h3>Habilidades</h3>
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
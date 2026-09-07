import React from 'react';
import { RenderPokemonsHomePage } from '../components/common/pokemon';

const PokemonsPage: React.FC = () => {
  return (
    <main className="page-wrapper">
      <RenderPokemonsHomePage />
    </main>
  );
};

export default PokemonsPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const PokemonTabs: React.FC = () => {
  const [tabActiva, setTabActiva] = useState<'favoritos' | 'eliminados'>('favoritos');
        const navigate = useNavigate();
  

  return (
    <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
    <button onClick={()=>navigate(-1)}>REGRESAR ATRAS</button>

      
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
          fontWeight: 'bold'
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
          fontWeight: 'bold'
        }}
      >
        🗑️ Eliminados
      </button>

    </div>
  );
};

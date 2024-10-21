import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TypeAbilityController } from '../controllers/TypeAbilityController';

function AbilityListView() {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    TypeAbilityController.loadAbilities(setAbilities);
  }, []);

  return (
    <div className="container mt-4">
      <h1>Lista de Habilidades</h1>
      <ul className="list-group">
        {abilities.map((ability) => (
          <li key={ability.id} className="list-group-item d-flex justify-content-between align-items-center">
            {ability.name}
            <div>
              <Link to={`/edit-ability/${ability.id}`} className="btn btn-warning btn-sm mr-2">Editar</Link>
              <button className="btn btn-danger btn-sm" onClick={() => TypeAbilityController.deleteAbility(ability.id, setAbilities)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AbilityListView;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TypeAbilityController } from '../controllers/TypeAbilityController';

function TypeListView() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    TypeAbilityController.loadTypes(setTypes);
  }, []);

  return (
    <div className="container mt-4">
      <h1>Lista de Tipos de Pokémon</h1>
      <ul className="list-group">
        {types.map((type) => (
          <li key={type.id} className="list-group-item d-flex justify-content-between align-items-center">
            {type.name}
            <div>
              <Link to={`/edit-type/${type.id}`} className="btn btn-warning btn-sm mr-2">Editar</Link>
              <button className="btn btn-danger btn-sm" onClick={() => TypeAbilityController.deleteType(type.id, setTypes)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeListView;

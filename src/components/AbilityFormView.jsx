import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeAbilityController } from '../controllers/TypeAbilityController';

function AbilityFormView() {
  const [ability, setAbility] = useState({
    name: ''
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Esto captura el id si estamos en modo de edición

  useEffect(() => {
    if (id) {
      // Cargar habilidad para editar si hay un id
      TypeAbilityController.loadAbilityById(id, setAbility);
    }
  }, [id]);

  // Manejar cambios en el input del formulario
  const handleChange = (e) => {
    setAbility({
      ...ability,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await TypeAbilityController.updateAbility(id, ability, navigate);
    } else {
      await TypeAbilityController.addAbility(ability, navigate);
    }
  };

  return (
    <div className="container mt-4">
      <h1>{id ? 'Editar Habilidad' : 'Agregar Habilidad'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Habilidad</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={ability.name}
            onChange={handleChange}
            placeholder="Nombre de la Habilidad"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar Habilidad' : 'Agregar Habilidad'}
        </button>
      </form>
    </div>
  );
}

export default AbilityFormView;

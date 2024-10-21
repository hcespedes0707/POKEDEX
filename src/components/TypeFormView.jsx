import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeAbilityController } from '../controllers/TypeAbilityController';

function TypeFormView() {
  const [type, setType] = useState({
    name: ''
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Captura el id si estamos en modo de edición

  useEffect(() => {
    if (id) {
      // Cargar tipo para editar si hay un id
      TypeAbilityController.loadTypeById(id, setType);
    }
  }, [id]);

  // Manejar cambios en el input del formulario
  const handleChange = (e) => {
    setType({
      ...type,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await TypeAbilityController.updateType(id, type, navigate);
    } else {
      await TypeAbilityController.addType(type, navigate);
    }
  };

  return (
    <div className="container mt-4">
      <h1>{id ? 'Editar Tipo' : 'Agregar Tipo'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Tipo</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={type.name}
            onChange={handleChange}
            placeholder="Nombre del Tipo"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar Tipo' : 'Agregar Tipo'}
        </button>
      </form>
    </div>
  );
}

export default TypeFormView;

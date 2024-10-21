import axios from 'axios';

const API_URL_ABILITIES = 'http://localhost:4000/api/abilities';
const API_URL_TYPES = 'http://localhost:4000/api/types';

export const TypeAbilityController = {

  // Cargar todas las habilidades
  loadAbilities: async (setAbilitiesList) => {
    try {
      const response = await axios.get(API_URL_ABILITIES);
      setAbilitiesList(response.data);
    } catch (error) {
      console.error('Error al cargar habilidades:', error);
    }
  },

  // Cargar habilidad por ID
  loadAbilityById: async (id, setAbility) => {
    try {
      const response = await axios.get(`${API_URL_ABILITIES}/${id}`);
      setAbility(response.data);
    } catch (error) {
      console.error('Error al cargar la habilidad:', error);
    }
  },

  // Agregar una nueva habilidad
  addAbility: async (abilityData, navigate) => {
    try {
      await axios.post(API_URL_ABILITIES, abilityData);
      navigate('/'); // Redirigir al dashboard o listado de habilidades después de agregar
    } catch (error) {
      console.error('Error al agregar habilidad:', error);
    }
  },

  // Actualizar una habilidad existente
  updateAbility: async (id, abilityData, navigate) => {
    try {
      await axios.put(`${API_URL_ABILITIES}/${id}`, abilityData);
      navigate('/'); // Redirigir después de actualizar
    } catch (error) {
      console.error('Error al actualizar habilidad:', error);
    }
  },

  // Eliminar una habilidad
  deleteAbility: async (id, setAbilitiesList) => {
    try {
      await axios.delete(`${API_URL_ABILITIES}/${id}`);
      const response = await axios.get(API_URL_ABILITIES); // Recargar la lista después de eliminar
      setAbilitiesList(response.data);
    } catch (error) {
      console.error('Error al eliminar habilidad:', error);
    }
  },

  // Cargar todos los tipos
  loadTypes: async (setTypesList) => {
    try {
      const response = await axios.get(API_URL_TYPES);
      setTypesList(response.data);
    } catch (error) {
      console.error('Error al cargar tipos de Pokémon:', error);
    }
  },

  // Cargar tipo por ID
  loadTypeById: async (id, setType) => {
    try {
      const response = await axios.get(`${API_URL_TYPES}/${id}`);
      setType(response.data);
    } catch (error) {
      console.error('Error al cargar el tipo:', error);
    }
  },

  // Agregar un nuevo tipo
  addType: async (typeData, navigate) => {
    try {
      await axios.post(API_URL_TYPES, typeData);
      navigate('/'); // Redirigir al dashboard o listado de tipos después de agregar
    } catch (error) {
      console.error('Error al agregar tipo:', error);
    }
  },

  // Actualizar un tipo existente
  updateType: async (id, typeData, navigate) => {
    try {
      await axios.put(`${API_URL_TYPES}/${id}`, typeData);
      navigate('/'); // Redirigir después de actualizar
    } catch (error) {
      console.error('Error al actualizar tipo:', error);
    }
  },

  // Eliminar un tipo
  deleteType: async (id, setTypesList) => {
    try {
      await axios.delete(`${API_URL_TYPES}/${id}`);
      const response = await axios.get(API_URL_TYPES); // Recargar la lista después de eliminar
      setTypesList(response.data);
    } catch (error) {
      console.error('Error al eliminar tipo:', error);
    }
  },
};

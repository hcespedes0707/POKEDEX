import axios from 'axios';

const API_URL = 'http://localhost:4000/api/pokemon';

export const PokemonController = {
  loadAllPokemon: async (setPokemons) => {
    const response = await axios.get(API_URL);
    setPokemons(response.data);
  },

  loadPokemonById: async (id, setPokemon) => {
    const response = await axios.get(`${API_URL}/${id}`);
    setPokemon(response.data);
  },

  addNewPokemon: async (formData, navigate) => {
    await axios.post(API_URL, formData);
    navigate('/');
  },

  updatePokemon: async (id, formData, navigate) => {
    await axios.put(`${API_URL}/${id}`, formData);
    navigate('/');
  },

  deletePokemon: async (id, setPokemons) => {
    await axios.delete(`${API_URL}/${id}`);
    PokemonController.loadAllPokemon(setPokemons);
  },

  loadAbilities: async (setAbilitiesList) => {
    const response = await axios.get('http://localhost:4000/api/abilities');
    setAbilitiesList(response.data);
  },

  loadTypes: async (setTypesList) => {
    const response = await axios.get('http://localhost:4000/api/types');
    setTypesList(response.data);
  }
};

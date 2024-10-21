import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PokemonDashboard from './components/PokemonDashboard';
import PokemonFormView from './components/PokemonFormView';
import AbilityFormView from './components/AbilityFormView';
import TypeFormView from './components/TypeFormView';
import AbilityListView from './components/AbilityListView';
import TypeListView from './components/TypeListView';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas de Pokémon */}
        <Route path="/" element={<PokemonDashboard />} />
        <Route path="/add" element={<PokemonFormView />} />
        <Route path="/edit/:id" element={<PokemonFormView />} />

        {/* Rutas de Habilidades */}
        <Route path="/abilities" element={<AbilityListView />} />
        <Route path="/add-ability" element={<AbilityFormView />} />
        <Route path="/edit-ability/:id" element={<AbilityFormView />} />

        {/* Rutas de Tipos de Pokémon */}
        <Route path="/types" element={<TypeListView />} />
        <Route path="/add-type" element={<TypeFormView />} />
        <Route path="/edit-type/:id" element={<TypeFormView />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesPokemons from './Components/MesPokemons';
import MonPokedex from './Components/MonPokedex';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.css';

// Définition de l'objet App.
// Celui-ci gère la génération du rendu de notre app.
function App() {
    return (
        <>
        <Navigation /> {/* Insertion de la banner et du menu de navigation. */} 
        {/* Définition de la table de routage. */}
        <Routes>
            <Route path='/' element={<MesPokemons/>}/>              {/* route / : lancement du render MesPokemons. */}
            <Route path='/MonPokedex' element={<MonPokedex/>}/>     {/* route /MonPokedex : lancement du render MonPokedex. */}
        </Routes>
        </>
  );
}

export default App;

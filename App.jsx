import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EditExercisePage from './EditExercisePage';
import CreateExercisePage from './CreateExercisePage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your exercises, update them, and stay fit!</p>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditExercisePage />} />
        <Route path="/create" element={<CreateExercisePage />} />
      </Routes>
      <footer>
        <p>© 2025 Logan Moskal</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;

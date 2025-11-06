import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function HomePage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  // Fetch exercises from the REST API
  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('/exercises');
      const data = await response.json();
      setExercises(data);
    };
    fetchExercises();
  }, []);

  // Delete an exercise
  const deleteExercise = async (id) => {
    const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      setExercises(exercises.filter((exercise) => exercise._id !== id));
    } else {
      alert('Failed to delete exercise');
    }
  };

  // Navigate to the Edit Exercise page
  const editExercise = (exercise) => {
    navigate('/edit', { state: { exercise } });
  };

  return (
    <div> 
      <div className="table-container">
        <button onClick={() => navigate('/create')}>Create New Exercise</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Unit</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise._id}>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.date}</td>
                <td>
                  <FaEdit onClick={() => editExercise(exercise)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaTrash onClick={() => deleteExercise(exercise._id)} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
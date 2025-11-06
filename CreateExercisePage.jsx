import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {
  const [formData, setFormData] = useState({
    name: '',
    reps: '',
    weight: '',
    unit: 'lbs',
    date: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'reps' || name === 'weight' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      alert('Exercise created successfully');
      navigate('/');
    } else {
      alert('Failed to create exercise');
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Reps:
          <input type="number" name="reps" value={formData.reps} onChange={handleChange} required />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </label>
        <label>
          Unit:
          <select name="unit" value={formData.unit} onChange={handleChange} required>
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
          </select>
        </label>
        <label>
          Date:
          <input type="text" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}

export default CreateExercisePage;
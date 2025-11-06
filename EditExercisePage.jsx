import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditExercisePage() {
  const { state } = useLocation();
  const { exercise } = state;
  const [formData, setFormData] = useState({ ...exercise });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'reps' || name === 'weight' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/exercises/${exercise._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert('Exercise updated successfully');
      navigate('/');
    } else {
      alert('Failed to update exercise');
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Exercise</h2>
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
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
}

export default EditExercisePage;
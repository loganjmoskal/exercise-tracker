/**
 * Name: Logan Moskal
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new exercise.
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    // Validate request body
    if (!name || !reps || !weight || !unit || !date ||
        typeof name !== 'string' || name.trim() === '' ||
        !Number.isInteger(reps) || reps <= 0 ||
        !Number.isInteger(weight) || weight <= 0 ||
        !['kgs', 'lbs'].includes(unit) ||
        !exercises.isDateValid(date)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const newExercise = await exercises.createExercise(req.body);
    res.status(201).json(newExercise);
}));

/**
 * Get all exercises.
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getAllExercises();
    res.status(200).json(allExercises);
}));

/**
 * Get an exercise by ID.
 */
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseById(req.params.id);
    if (!exercise) {
        return res.status(404).json({ Error: "Not found" });
    }
    res.status(200).json(exercise);
}));

/**
 * Update an exercise by ID.
 */
app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    // Validate request body
    if (!name || !reps || !weight || !unit || !date ||
        typeof name !== 'string' || name.trim() === '' ||
        !Number.isInteger(reps) || reps <= 0 ||
        !Number.isInteger(weight) || weight <= 0 ||
        !['kgs', 'lbs'].includes(unit) ||
        !exercises.isDateValid(date)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const updatedExercise = await exercises.updateExerciseById(req.params.id, req.body);
    if (!updatedExercise) {
        return res.status(404).json({ Error: "Not found" });
    }
    res.status(200).json(updatedExercise);
}));

/**
 * Delete an exercise by ID.
 */
app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const deleted = await exercises.deleteExerciseById(req.params.id);
    if (!deleted) {
        return res.status(404).json({ Error: "Not found" });
    }
    res.status(204).send();
}));
/**
 * Name: Logan Moskal
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Define the schema for exercises.
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
    date: { type: String, required: true, validate: isDateValid }
});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Validate the date format (MM-DD-YY).
 * @param {string} date
 * @returns {boolean}
 */
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create a new exercise.
 * @param {Object} exerciseData
 * @returns {Promise<Object>}
 */
async function createExercise(exerciseData) {
    const exercise = new Exercise(exerciseData);
    return exercise.save();
}

/**
 * Get all exercises.
 * @returns {Promise<Array>}
 */
async function getAllExercises() {
    return Exercise.find();
}

/**
 * Get an exercise by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function getExerciseById(id) {
    return Exercise.findById(id);
}

/**
 * Update an exercise by ID.
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Object|null>}
 */
async function updateExerciseById(id, updateData) {
    return Exercise.findByIdAndUpdate(id, updateData, { new: true });
}

/**
 * Delete an exercise by ID.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function deleteExerciseById(id) {
    const result = await Exercise.findByIdAndDelete(id);
    return !!result;
}

export {
    connect,
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExerciseById,
    deleteExerciseById,
    isDateValid
};
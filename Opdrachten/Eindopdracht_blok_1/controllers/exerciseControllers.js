const exerciseModel = require("../models/exerciseModel");

function getExercisesPage(req, res) {
  const exercises = exerciseModel.readAllExercises();
  res.render("./exercises/exercises.ejs", { exercises });
}

function saveExercise(req, res) {
  const exercise = req.body;
  exerciseModel.saveExercise(exercise);
  res.redirect("/exercises");
}

function deleteExercise(req, res) {
  const exercise = req.params.name;
  exerciseModel.deleteExercise(exercise);
  res.end()
}

function updateExercise(req, res) {
  const exerciseName = req.params.name;
  const exerciseSets = req.params.sets;
  const exerciseReps = req.params.reps;
  const exerciseWeight = req.params.weight;
  const hiddenName = req.params.hidden;
  exerciseModel.updateExercise(exerciseName, exerciseSets, exerciseReps, exerciseWeight, hiddenName);
  res.end();
}

module.exports = {
  getExercisesPage,
  saveExercise,
  deleteExercise,
  updateExercise,
};

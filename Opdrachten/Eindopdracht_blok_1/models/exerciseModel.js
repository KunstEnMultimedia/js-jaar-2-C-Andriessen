const fs = require("fs");
const { userInfo } = require("os");
const path = require("path");

function readAllExercises() {
  const json = fs
    .readFileSync(path.resolve(__dirname, "../data/exercises.json"))
    .toString();
  return JSON.parse(json);
}

function saveExercise(exercise) {
  let json = fs
    .readFileSync(path.resolve(__dirname, "../data/exercises.json"))
    .toString();
  const exercises = JSON.parse(json);
  exercises.push(exercise);
  json = JSON.stringify(exercises);
  fs.writeFileSync(path.resolve(__dirname, "../data/exercises.json"), json);
}

function deleteExercise (exercise) {
  let json = fs
  .readFileSync(path.resolve(__dirname, "../data/exercises.json"))
  .toString(); 
  let exercises = JSON.parse(json);
  exercises = exercises.filter(function(item) { 
    return item.name !== exercise; 
  });
  json = JSON.stringify(exercises);
  fs.writeFileSync(path.resolve(__dirname, "../data/exercises.json"), json);
}

function updateExercise (exerciseName, exerciseSets, exerciseReps, exerciseWeight, hiddenName) {
  let json = fs
  .readFileSync(path.resolve(__dirname, "../data/exercises.json"))
  .toString();
  let exercises = JSON.parse(json);

  exercises = exercises.filter(function(item) {
    if (item.name == hiddenName) {
      item.name = exerciseName;
      item.sets = exerciseSets;
      item.reps = exerciseReps;
      item.weight = exerciseWeight;
    }
    return item;
  });
  json = JSON.stringify(exercises);
  fs.writeFileSync(path.resolve(__dirname, "../data/exercises.json"), json);
}

module.exports = {
  readAllExercises,
  saveExercise,
  deleteExercise,
  updateExercise,
};

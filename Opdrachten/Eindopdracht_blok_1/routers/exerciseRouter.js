const exerciseControllers = require("../controllers/exerciseControllers");

const router = require("express").Router();


router.get("/", exerciseControllers.getExercisesPage);
router.post("/", exerciseControllers.saveExercise);
router.put("/:name/:sets/:reps/:weight/:hidden", exerciseControllers.updateExercise);
router.delete("/:name", exerciseControllers.deleteExercise);

module.exports = router;

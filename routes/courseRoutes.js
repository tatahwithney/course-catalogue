const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

// Display all courses
router.get("/", courseController.getAllCourses);

// Display create form
router.get("/new", courseController.showCreateForm);

// Create course
router.post("/", courseController.createCourse);

// Display one course
router.get("/:id", courseController.getCourse);

// Display edit form
router.get("/:id/edit", courseController.showEditForm);

// Update course
router.post("/:id/edit", courseController.updateCourse);

// Delete course
router.post("/:id/delete", courseController.deleteCourse);

module.exports = router;
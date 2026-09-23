const Course = require("../models/course");

// Get all courses
exports.getAllCourses = () => {
    return Course.find();
};

// Get one course by ID
exports.getCourseById = (id) => {
    return Course.findById(id);
};

// Create a course
exports.createCourse = (courseData) => {
    return Course.create(courseData);
};

// Update a course
exports.updateCourse = (id, courseData) => {
    return Course.findByIdAndUpdate(id, courseData, {
        new: true,
        runValidators: true
    });
};

// Delete a course
exports.deleteCourse = (id) => {
    return Course.findByIdAndDelete(id);
};
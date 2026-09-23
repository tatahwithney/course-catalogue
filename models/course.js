const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Course name is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Course description is required"],
            trim: true,
        },

        duration: {
            type: Number,
            required: [true, "Duration is required"],
            min: [1, "Duration must be at least 1 week"],
        },

        instructor: {
            type: String,
            required: [true, "Instructor is required"],
            trim: true,
        },

        maxStudents: {
            type: Number,
            required: [true, "Maximum students is required"],
            min: [1, "Maximum students must be at least 1"],
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
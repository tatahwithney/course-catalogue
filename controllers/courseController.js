const courseService = require("../services/courseService");

// Display all courses
exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getAllCourses();

        res.render("courses/index", {
            courses
        });
    } catch (error) {
        next(error);
    }
};

// Display create course form
exports.showCreateForm = (req, res) => {
    res.render("courses/new", {
        course: {},
        errors: {}
    });
};

// Create a course
exports.createCourse = async (req, res, next) => {
    try {
        const { name, description, duration, instructor, maxStudents } = req.body;

        await courseService.createCourse({
            name,
            description,
            duration,
            instructor,
            maxStudents
        });

        res.redirect("/courses");
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).render("courses/new", {
                course: req.body,
                errors
            });
        }

        next(error);
    }
};

// Display one course
exports.getCourse = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);

        if (!course) {
            return res.status(404).render("404");
        }

        res.render("courses/show", {
            course
        });
    } catch (error) {
        next(error);
    }
};

// Display edit form
exports.showEditForm = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);

        if (!course) {
            return res.status(404).render("404");
        }

        res.render("courses/edit", {
            course,
            errors: {}
        });
    } catch (error) {
        next(error);
    }
};

// Update a course
exports.updateCourse = async (req, res, next) => {
    try {
        const { name, description, duration, instructor, maxStudents } = req.body;

        const course = await courseService.updateCourse(req.params.id, {
            name,
            description,
            duration,
            instructor,
            maxStudents
        });

        if (!course) {
            return res.status(404).render("404");
        }

        res.redirect(`/courses/${course._id}`);
    } catch (error) {
        if (error.name === "ValidationError") {
            const course = await courseService.getCourseById(req.params.id);

            if (!course) {
                return res.status(404).render("404");
            }

            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).render("courses/edit", {
                course: {
                    ...course.toObject(),
                    ...req.body
                },
                errors
            });
        }

        next(error);
    }
};

// Delete a course
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);

        if (!course) {
            return res.status(404).render("404");
        }

        res.redirect("/courses");
    } catch (error) {
        next(error);
    }
};
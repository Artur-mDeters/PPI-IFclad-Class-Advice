const express = require("express");
const routes = express.Router();

const routeUsers = require("./user.routes");
const routeLogin = require("./login.routes");
const routeClass = require("./class.routes");
const routeTeachers = require("./teacher.routes");
const routeCourses = require("./course.routes");
const routeStudents = require("./student.routes");
const routeSubjects = require("./subject.routes");
const routeSectors = require('./sector.routes')

routes.use(
  routeUsers,
  routeClass,
  routeLogin,
  routeTeachers,
  routeCourses,
  routeStudents,
  routeSubjects,
  routeSectors
);

module.exports = routes;

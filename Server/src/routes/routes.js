const express = require("express");
const routes = express.Router();

const routeUsers = require("./user.routes");
const routeClass = require("./class.routes");
const routeTeachers = require("./teacher.routes");
const routeCourses = require("./course.routes");
const routeStudents = require("./student.routes");
const routeSubjects = require("./subject.routes");
const routeSectors = require('./sector.routes')
const routeGrades = require('./grades.routes')
const routeAuth = require("./auth.routes");
const apresentationRoutes = require('./apresentation.routes')

routes.use(
  routeAuth,
  routeUsers,
  routeClass,
  routeTeachers,
  routeCourses,
  routeStudents,
  routeSubjects,
  routeSectors,
  routeGrades,
  apresentationRoutes
);

module.exports = routes;

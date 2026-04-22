const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Users
router.get('/users/students', verifyToken, verifyRole(['admin', 'teacher']), apiController.getStudents);
router.get('/users/teachers', verifyToken, verifyRole(['admin']), apiController.getTeachers);

// Courses
router.get('/courses', verifyToken, apiController.getCourses);

// Materials
router.get('/materials', verifyToken, apiController.getMaterials);
router.post('/materials', verifyToken, verifyRole(['teacher', 'admin']), apiController.createMaterial);

// Classes
router.get('/classes', verifyToken, apiController.getClasses);
router.post('/classes', verifyToken, verifyRole(['teacher', 'admin']), apiController.createClass);

// Exams
router.get('/exams', verifyToken, apiController.getExams);
router.post('/exams', verifyToken, verifyRole(['teacher', 'admin']), apiController.createExam);

module.exports = router;

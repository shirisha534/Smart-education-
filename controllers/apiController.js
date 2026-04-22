const { dbGet, dbRun, dbAll } = require('../models/db');

exports.getStudents = async (req, res) => {
    try {
        const students = await dbAll('SELECT id, name, email FROM users WHERE role = ?', ['student']);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await dbAll('SELECT id, name, email FROM users WHERE role = ?', ['teacher']);
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await dbAll('SELECT * FROM courses');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMaterials = async (req, res) => {
    try {
        const materials = await dbAll(`
            SELECT m.*, u.name as teacher_name 
            FROM materials m
            LEFT JOIN users u ON m.teacher_id = u.id
        `);
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createMaterial = async (req, res) => {
    try {
        const { title, type, course_id, file_url } = req.body;
        const teacher_id = req.user.id;
        const result = await dbRun(
            'INSERT INTO materials (title, type, course_id, file_url, teacher_id) VALUES (?, ?, ?, ?, ?)',
            [title, type, course_id, file_url, teacher_id]
        );
        res.status(201).json({ message: 'Material uploaded', id: result.lastID });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await dbAll(`
            SELECT c.*, u.name as teacher_name 
            FROM live_classes c
            LEFT JOIN users u ON c.teacher_id = u.id
            ORDER BY c.scheduled_time ASC
        `);
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createClass = async (req, res) => {
    try {
        const { title, course_id, scheduled_time } = req.body;
        const teacher_id = req.user.id;
        const result = await dbRun(
            'INSERT INTO live_classes (title, course_id, scheduled_time, teacher_id) VALUES (?, ?, ?, ?)',
            [title, course_id, scheduled_time, teacher_id]
        );
        res.status(201).json({ message: 'Class scheduled', id: result.lastID });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getExams = async (req, res) => {
    try {
        const exams = await dbAll(`
            SELECT t.*, u.name as teacher_name 
            FROM tests t
            LEFT JOIN courses c ON t.course_id = c.id
            LEFT JOIN users u ON c.teacher_id = u.id
        `);
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createExam = async (req, res) => {
    try {
        const { title, course_id, total_marks } = req.body;
        const result = await dbRun(
            'INSERT INTO tests (title, course_id, total_marks) VALUES (?, ?, ?)',
            [title, course_id, total_marks]
        );
        res.status(201).json({ message: 'Exam created', id: result.lastID });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

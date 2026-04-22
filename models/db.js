const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../database/school.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            teacher_id INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            course_id INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            course_id INTEGER,
            total_marks INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            test_id INTEGER,
            score INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS materials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            type TEXT,
            file_url TEXT,
            course_id TEXT,
            teacher_id INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS live_classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            scheduled_time DATETIME,
            teacher_id INTEGER,
            course_id TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            teacher_id INTEGER,
            stars INTEGER,
            feedback TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            message TEXT,
            is_read INTEGER DEFAULT 0
        )`);

        // Seed data (Optional, check if admin exists)
        db.get("SELECT * FROM users WHERE email = 'admin@smartsys.com'", async (err, row) => {
            if (!row) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin123', salt);
                db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ['Super Admin', 'admin@smartsys.com', hashedPassword, 'admin']);
                console.log('Admin user seeded');
            }
        });
        
        db.get("SELECT * FROM users WHERE email = 'teacher@smartsys.com'", async (err, row) => {
            if (!row) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('teacher123', salt);
                db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ['John Doe (Teacher)', 'teacher@smartsys.com', hashedPassword, 'teacher']);
                console.log('Teacher user seeded');
            }
        });

        db.get("SELECT * FROM users WHERE email = 'student@smartsys.com'", async (err, row) => {
            if (!row) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('student123', salt);
                db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ['Jane Smith (Student)', 'student@smartsys.com', hashedPassword, 'student']);
                console.log('Student user seeded');
            }
        });
    });
}

// Utility wrapper for promises
const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const dbGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = { db, dbRun, dbGet, dbAll };

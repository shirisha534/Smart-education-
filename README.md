# Smart Education System

A comprehensive web-based education platform built with Node.js, Express, and SQLite that provides features for students, teachers, and administrators to manage online learning, courses, exams, and performance tracking.

## Features

- **User Authentication**: Secure login and registration for students, teachers, and admins
- **Role-based Access Control**: Different dashboards and permissions for each user type
- **Course Management**: Create and manage courses, study materials, and online classes
- **Exam System**: Create, manage, and take exams with automated grading
- **Performance Tracking**: Monitor student progress and generate reports
- **AI Assistant**: Integrated AI-powered learning assistant
- **Admin Dashboard**: Comprehensive administrative controls

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## Running the Project

### Development
```bash
node server.js
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Production
The application is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.

## Project Structure

```
project/
├── package.json          # Project dependencies and scripts
├── render.yaml           # Render deployment configuration
├── server.js             # Main application server
├── controllers/          # Route controllers
│   ├── apiController.js  # API endpoints logic
│   └── authController.js # Authentication logic
├── database/             # Database related files
├── middleware/           # Express middleware
│   └── auth.js           # Authentication middleware
├── models/               # Database models
│   └── db.js             # Database initialization and schema
├── public/               # Static assets
│   ├── css/
│   │   └── style.css     # Application styles
│   ├── images/           # Image assets
│   └── js/
│       └── main.js       # Client-side JavaScript
├── routes/               # Express routes
│   ├── api.js            # API routes
│   └── auth.js           # Authentication routes
└── views/                # HTML templates
    ├── index.html        # Landing page
    ├── login.html        # Login page
    ├── register.html     # Registration page
    ├── admin-dashboard.html    # Admin dashboard
    ├── admin-students.html     # Student management
    ├── admin-teachers.html     # Teacher management
    ├── admin-courses.html      # Course management
    ├── admin-settings.html     # Admin settings
    ├── teacher-dashboard.html  # Teacher dashboard
    ├── teacher-classes.html    # Teacher's classes
    ├── student-dashboard.html  # Student dashboard
    ├── online-classes.html     # Online classes
    ├── exams.html              # Exam interface
    ├── create-exams.html       # Exam creation
    ├── performance.html        # Performance reports
    ├── study-materials.html    # Study materials
    ├── upload-materials.html   # Upload materials
    ├── manage-students.html    # Student management
    └── ai-assistant.html       # AI assistant interface
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### API Routes
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create a new exam
- `GET /api/students` - Get all students
- `GET /api/teachers` - Get all teachers

## Database

The application uses SQLite3 as the database. The database schema and initialization are handled in `models/db.js`. The database file will be created automatically when the server starts.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
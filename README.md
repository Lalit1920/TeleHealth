# TeleHealth Application

A comprehensive TeleHealth management system built with Spring Boot, MongoDB, and vanilla HTML/CSS/JavaScript.

## Features

### Patient Portal
- Add new patient information
- Update existing patient records
- View patient list
- Medical history and medication tracking

### Admin Dashboard
- Secure admin login
- View all patients
- Search patients by name or email
- Delete patient records
- Detailed patient information view

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **Spring Web**
- **Spring Validation**
- **Maven**

### Frontend
- **HTML5**
- **CSS3** (with responsive design)
- **Vanilla JavaScript**
- **Fetch API** for REST communication

### Database
- **MongoDB**

## Project Structure

```
TeleHealth/
├── backend/
│   ├── src/main/java/com/telehealth/
│   │   ├── entity/          # JPA Entities
│   │   ├── repository/      # Data repositories
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── exception/       # Custom exceptions
│   │   └── config/          # Configuration classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── pages/
│   │   ├── admin-login.html
│   │   └── admin-dashboard.html
│   └── index.html
├── init-db.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+
- Modern web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Initialize database (optional):**
   ```bash
   mongo < ../init-db.js
   ```

5. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Open frontend in browser:**
   - Open `frontend/index.html` in your web browser
   - Or serve using a local web server:
   ```bash
   cd frontend
   python -m http.server 3000
   ```

## API Endpoints

### Patient Management
- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient
- `GET /api/patients/search?q={term}` - Search patients

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register new admin

## Usage

### Patient Portal (`index.html`)
1. Fill out the patient form with required information
2. Click "Add Patient" to save
3. View all patients in the table below
4. Click "Edit" to modify patient information

### Admin Dashboard
1. Go to Admin Login page
2. Use credentials: `admin` / `admin123`
3. Search patients using the search bar
4. View detailed patient information
5. Delete patients if needed

## Key Features Implemented

### Spring Boot Annotations Used
- `@SpringBootApplication`
- `@RestController`
- `@RequestMapping`
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`
- `@Service`
- `@Repository`
- `@Document`
- `@Id`
- `@Valid`
- `@CrossOrigin`
- `@RestControllerAdvice`
- `@ExceptionHandler`

### Design Patterns
- **Repository Pattern** - Data access abstraction
- **Service Layer Pattern** - Business logic separation
- **MVC Pattern** - Model-View-Controller architecture
- **Abstract Base Class** - BaseEntity for common fields

### Exception Handling
- Custom `PatientNotFoundException`
- Global exception handler with `@RestControllerAdvice`
- Proper HTTP status codes

### Validation
- Bean validation with `@Valid`
- Custom validation messages
- Frontend form validation

## Security Features
- CORS configuration
- Input validation
- Admin authentication
- SQL injection prevention (NoSQL)

## Responsive Design
- Mobile-friendly interface
- Flexible grid layout
- Touch-friendly buttons
- Responsive tables

## Demo Credentials
- **Admin Username:** admin
- **Admin Password:** admin123

## Future Enhancements
- JWT authentication
- Password encryption
- File upload for medical documents
- Email notifications
- Appointment scheduling
- Real-time chat
- Payment integration
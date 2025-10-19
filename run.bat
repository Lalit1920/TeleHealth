@echo off
echo Starting TeleHealth Application...
echo.

echo 1. Starting MongoDB (make sure MongoDB is installed)
start "MongoDB" mongod

echo 2. Waiting for MongoDB to start...
timeout /t 5 /nobreak > nul

echo 3. Starting Spring Boot Backend...
cd backend
start "TeleHealth Backend" mvn spring-boot:run

echo 4. Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo 5. Opening Frontend in browser...
cd ..\frontend
start "" index.html

echo.
echo TeleHealth Application is starting...
echo Backend: http://localhost:8080
echo Frontend: Open index.html in your browser
echo.
echo Admin Login: admin / admin123
echo.
pause
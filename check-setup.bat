@echo off
echo Checking TeleHealth Setup...
echo.

echo 1. Checking if MongoDB is running...
netstat -an | find "27017" > nul
if %errorlevel% == 0 (
    echo ✓ MongoDB is running on port 27017
) else (
    echo ✗ MongoDB is not running. Please start MongoDB first.
    echo   Run: mongod
    pause
    exit
)

echo.
echo 2. Testing backend connection...
cd backend
echo Starting backend for testing...
start /min "Backend Test" mvn spring-boot:run

echo.
echo 3. Waiting for backend to start (30 seconds)...
timeout /t 30 /nobreak > nul

echo.
echo 4. Testing API endpoint...
curl -s http://localhost:8080/api/test/health
echo.

echo.
echo Setup check complete!
echo If you see "status": "OK" above, the backend is working.
echo.
pause
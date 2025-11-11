@echo off
REM Startup script for SAP GCC Hoodie Photo Booth Frontend (Windows)

echo Starting SAP GCC Hoodie Photo Booth Frontend...

REM Navigate to frontend directory
cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed
)

REM Start the development server
echo Starting Vite development server on http://localhost:3000
call npm run dev

pause

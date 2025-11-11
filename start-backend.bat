@echo off
REM Startup script for SAP GCC Hoodie Photo Booth Backend (Windows)

echo Starting SAP GCC Hoodie Photo Booth Backend...

REM Navigate to backend directory
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo No .env file found. Creating from template...
    copy .env.example .env
    echo Please edit backend\.env and add your Replicate API token (optional)
)

REM Start the Flask server
echo Starting Flask server on http://localhost:5000
python app.py

pause

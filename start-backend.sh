#!/bin/bash

# Startup script for SAP GCC Hoodie Photo Booth Backend

echo "🚀 Starting SAP GCC Hoodie Photo Booth Backend..."

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp .env.example .env
    echo "⚙️  Please edit backend/.env and add your Replicate API token (optional)"
fi

# Start the Flask server
echo "🎉 Starting Flask server on http://localhost:5000"
python app.py

#!/bin/bash

# Startup script for SAP GCC Hoodie Photo Booth Frontend

echo "🚀 Starting SAP GCC Hoodie Photo Booth Frontend..."

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Start the development server
echo "🎉 Starting Vite development server on http://localhost:3000"
npm run dev

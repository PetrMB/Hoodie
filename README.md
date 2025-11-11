# SAP GCC Hoodie Photo Booth

Professional LinkedIn Portrait Generator with Škoda GCC Branded Hoodies

![Škoda Auto](https://img.shields.io/badge/Škoda-Auto-4BA82E?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask)

## 🎯 Overview

This application allows users to generate professional LinkedIn-style portraits featuring Škoda GCC branded hoodies. The app supports three hoodie color variants (green, black, white) and uses AI technology to create high-quality corporate headshots.

## 📦 Two Versions Available

### 🚀 **Standalone Version** (RECOMMENDED for most users)
**Zero installation required!** Just open `index.html` in your browser.

- ✅ **One HTML file** - No installation, no setup
- ✅ **Works anywhere** - Desktop, laptop, tablet, mobile
- ✅ **Offline capable** - No internet needed after first load
- ✅ **Privacy-first** - All processing in your browser
- ✅ **Easy deployment** - Upload to any website or share via email

**👉 [See Standalone Documentation](README_STANDALONE.md)**

### ⚡ **Full Version** (Advanced features)
Professional development stack with backend API and AI integration.

- 🤖 **Advanced AI** - Replicate API integration for better results
- 🏗️ **Modern stack** - React + TypeScript + Flask
- 🔧 **Customizable** - Full control over functionality
- 📊 **Scalable** - Multi-user server deployment

**👉 Continue reading below for full version setup**

---

## ✨ Features

- 📸 **Easy Photo Upload** - Drag & drop or click to upload face photos
- 🎨 **Multiple Hoodie Colors** - Choose from green, black, or white Škoda GCC hoodies
- 🤖 **AI-Powered Generation** - Professional portrait generation using advanced AI
- ✏️ **Custom Adjustments** - Fine-tune portraits with custom prompt instructions
- 💾 **Persistent Storage** - Hoodie images stored once, available for all users
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Škoda Auto CI** - Follows official Škoda Auto corporate identity

## 🏗️ Architecture

### Standalone Version
```
Hoodie/
├── index.html                  # ⭐ STANDALONE APP - Just open this!
├── README_STANDALONE.md        # Standalone documentation
└── HOODIE_IMAGES_GUIDE.md     # Guide for creating hoodie images
```

### Full Version (Advanced)
```
Hoodie/
├── backend/              # Flask API Server
│   ├── app.py           # Main application
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Environment variables template
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── styles/      # CSS stylesheets
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utility functions
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── package.json     # Node dependencies
│   ├── vite.config.ts   # Vite configuration
│   └── tsconfig.json    # TypeScript configuration
├── hoodies/             # Uploaded hoodie images
│   ├── green/
│   ├── black/
│   └── white/
└── generated_portraits/ # Generated portraits storage
```

## 🚀 Quick Start

### 🎯 Standalone Version (Recommended)

**No prerequisites needed!** Just:

1. Open `index.html` in any modern web browser
2. Upload hoodie images in Admin Panel (one-time setup)
3. Start generating portraits!

👉 **[Full Standalone Guide →](README_STANDALONE.md)**

---

### ⚡ Full Version Setup (Advanced)

**Prerequisites:**

- **Node.js** 18+ and npm
- **Python** 3.9+
- **pip** (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
```bash
cp .env.example .env
```

5. (Optional) Add your Replicate API token to `.env` for AI-powered generation:
```
REPLICATE_API_TOKEN=your_token_here
```
> Get your token at: https://replicate.com/account/api-tokens

6. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### First-Time Setup

1. Open your browser and navigate to `http://localhost:3000`
2. Scroll to the Admin Panel at the bottom
3. Upload JPG images of the Škoda GCC hoodies for each color:
   - Green hoodie
   - Black hoodie
   - White hoodie
4. Once uploaded, the hoodies are available for all users

## 📖 Usage Guide

### For End Users

1. **Upload Your Photo**
   - Click the upload area or drag & drop your face photo
   - Ensure good lighting and a clear view of your face
   - Supported formats: JPG, JPEG, PNG (max 10MB)

2. **Select Hoodie Color**
   - Choose from available colors: Green, Black, or White
   - Preview the selected hoodie

3. **Fine-tune (Optional)**
   - Add custom instructions like "smiling" or "professional look"
   - Use quick suggestions or write your own

4. **Generate Portrait**
   - Click "Generate LinkedIn Portrait"
   - Wait for AI processing (usually 10-30 seconds)
   - Preview and download your portrait

5. **Download & Use**
   - Click "Download Portrait"
   - Use on LinkedIn, email signatures, company directories

### For Administrators

1. **Open Admin Panel**
   - Click "Show Admin Panel" at the bottom of the page

2. **Upload Hoodies**
   - Select color variant (green, black, white)
   - Choose JPG image of the hoodie
   - Click "Upload"

3. **Requirements for Hoodie Images**
   - Format: JPG or JPEG
   - Max size: 10MB
   - Recommended: 1024x1024px or larger
   - Must show Škoda GCC branding on chest
   - Must show electronic circuit graphic on right sleeve

## 🎨 Škoda GCC Hoodie Specifications

The hoodies featured in this app include:

- **Front Left Chest**: "Škoda GCC" logo (GCC on separate line)
- **Right Sleeve**: Minimalistic electronic circuit graphic
- **Available Colors**:
  - Green (#4BA82E) - Classic Škoda brand color
  - Black (#000000) - Professional & sleek
  - White (#FFFFFF) - Clean & modern

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env`:

```env
# Replicate API Token (optional)
REPLICATE_API_TOKEN=your_token_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### Frontend Configuration

Create `frontend/.env`:

```env
# API Base URL (default: http://localhost:5000)
VITE_API_URL=http://localhost:5000
```

## 🚢 Production Deployment

### Backend Deployment

1. Set production environment:
```bash
export FLASK_ENV=production
export FLASK_DEBUG=False
```

2. Use a production WSGI server (e.g., Gunicorn):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment

1. Build the production bundle:
```bash
cd frontend
npm run build
```

2. The build output is in `frontend/dist/` - serve with any static file server

### Docker Deployment (Optional)

Create `Dockerfile` for backend:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

Create `Dockerfile` for frontend:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

## 🛠️ Development

### Backend Development

```bash
cd backend
python app.py
```

The server auto-reloads on code changes when `FLASK_DEBUG=True`.

### Frontend Development

```bash
cd frontend
npm run dev
```

Vite provides hot module replacement (HMR) for instant updates.

### Type Checking

```bash
cd frontend
npm run type-check
```

### Linting

```bash
cd frontend
npm run lint
```

## 📝 API Documentation

### Endpoints

#### `GET /api/health`
Health check endpoint
- **Response**: `{ "status": "healthy", "message": "..." }`

#### `POST /api/upload-hoodie`
Upload hoodie image
- **Body**: `multipart/form-data` with `file` and `color` fields
- **Response**: `{ "success": true, "color": "green", "filename": "..." }`

#### `GET /api/hoodies`
Get available hoodies
- **Response**: `{ "green": { "available": true, "path": "..." }, ... }`

#### `GET /api/hoodie-image/:color`
Get hoodie image as base64
- **Response**: `{ "color": "green", "image": "data:image/jpeg;base64,..." }`

#### `POST /api/generate-portrait`
Generate portrait
- **Body**: `{ "faceImage": "base64...", "color": "green", "promptAdjustment": "..." }`
- **Response**: `{ "success": true, "image": "data:image/jpeg;base64,...", "filename": "..." }`

#### `GET /api/download/:filename`
Download generated portrait
- **Response**: File download

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload face photo
- [ ] Select each hoodie color
- [ ] Add custom prompt adjustment
- [ ] Generate portrait
- [ ] Download result
- [ ] Upload hoodie images (admin)
- [ ] Test on mobile device
- [ ] Test with different image formats
- [ ] Test error handling (invalid files, missing hoodies)

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (should be 3.9+)
- Verify all dependencies installed: `pip install -r requirements.txt`
- Check port 5000 is not in use: `lsof -i :5000` (Unix) or `netstat -ano | findstr :5000` (Windows)

### Frontend won't start
- Check Node version: `node --version` (should be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is not in use

### Portrait generation fails
- Ensure backend is running
- Check browser console for errors
- Verify hoodie images are uploaded
- If using Replicate API, check API token is valid

### Images not loading
- Check file permissions in `hoodies/` and `generated_portraits/` directories
- Verify backend has write access to these directories
- Check browser console for CORS errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Škoda Auto a.s.

## 🙏 Acknowledgments

- **Škoda Auto** for corporate identity and branding
- **React** for the frontend framework
- **Flask** for the backend API
- **Replicate** for AI model hosting (optional)
- **Vite** for fast development tooling

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on the project repository
- Contact the SAP GCC development team

---

Made with ❤️ for Škoda Auto SAP GCC Team

© 2024 Škoda Auto a.s. All rights reserved.

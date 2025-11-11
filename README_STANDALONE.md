# SAP GCC Hoodie Photo Booth - Standalone Version

🎉 **No Installation Required!** Just open `index.html` in your browser.

![Škoda Auto](https://img.shields.io/badge/Škoda-Auto-4BA82E?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. That's it! No installation needed.

### Option 2: Hosting on Web Server
1. Upload `index.html` to your web server
2. Access it via your domain: `https://yourcompany.com/hoodie-photobooth/`
3. Share the link with your team

## ✨ Features

- 📸 **Zero Installation** - Just one HTML file, works anywhere
- 💾 **Persistent Storage** - Uses IndexedDB to store hoodies permanently
- 🎨 **Client-Side Processing** - All image processing in your browser
- 🖼️ **Drag & Drop** - Easy photo upload
- 🎭 **Škoda Auto CI** - Official corporate identity colors
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🔒 **Privacy-First** - All processing happens locally, no data sent to servers

## 📋 How to Use

### First-Time Setup (Admin Only - Once per installation)

1. **Open the application**
   - Double-click `index.html` OR
   - Open it from your web browser's File menu OR
   - Host it on your web server

2. **Scroll to Admin Panel** at the bottom

3. **Upload Hoodie Images** (one-time setup):
   - Select color: Green, Black, or White
   - Click "Choose File" and select JPG image of the hoodie
   - Click "Upload Hoodie"
   - Repeat for all three colors

   **Hoodie Image Requirements:**
   - Format: JPG/JPEG
   - Must show "Škoda GCC" branding on left chest
   - Must show electronic circuit graphic on right sleeve
   - Recommended size: 1024x1024px or larger

4. **Done!** Hoodies are now available for everyone using this browser/device

### Generating Portraits (End Users)

1. **Upload Your Photo** (Step 1)
   - Click the upload area or drag & drop your face photo
   - Supported formats: JPG, PNG, JPEG
   - Max size: 10MB
   - Tips: Use clear, front-facing photo with good lighting

2. **Choose Hoodie Color** (Step 2)
   - Select from Green, Black, or White
   - Preview the selected hoodie

3. **Fine-tune** (Step 3 - Optional)
   - Add custom instructions like "smiling" or "professional look"
   - Use quick suggestion chips

4. **Generate Portrait**
   - Click "🎨 Generate LinkedIn Portrait"
   - Wait a few seconds for processing
   - Your portrait appears below

5. **Download & Use**
   - Click "⬇️ Download Portrait"
   - Use on LinkedIn, email signatures, company directories

## 🔧 Technical Details

### What's Inside
- **Single HTML file** with embedded CSS and JavaScript
- **No external dependencies** - everything is self-contained
- **IndexedDB** for permanent storage of hoodie images
- **Canvas API** for image composition and portrait generation
- **FileReader API** for local file processing

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ⚠️ Internet Explorer: Not supported (use Edge instead)

### Storage
- Hoodies are stored using **IndexedDB** in your browser
- Storage is **permanent** until you clear browser data
- Each hoodie ~100KB-500KB depending on image size
- Total storage needed: ~1-2MB for all three hoodies

### Privacy & Security
- ✅ **No server required** - works completely offline
- ✅ **No data transmission** - all processing in your browser
- ✅ **No tracking** - zero analytics or external scripts
- ✅ **Secure** - no security vulnerabilities from backend code

## 📁 File Structure

```
Hoodie/
├── index.html           ← STANDALONE APPLICATION (just open this!)
├── README_STANDALONE.md ← This file
├── HOODIE_IMAGES_GUIDE.md ← Guide for creating hoodie images
│
├── backend/             ← Advanced version (optional)
├── frontend/            ← Advanced version (optional)
└── README.md            ← Full version documentation
```

## 🌐 Deployment Options

### 1. Local Usage
Just open `index.html` - no server needed!

### 2. Internal Network Share
Copy `index.html` to a network share:
```
\\server\shared\tools\hoodie-photobooth\index.html
```

### 3. Web Server
Upload to any web server:
```bash
# Via FTP/SFTP
scp index.html user@server:/var/www/html/photobooth/

# Via Git
git push origin main
# Then access via GitHub Pages
```

### 4. SharePoint/Teams
1. Upload `index.html` to SharePoint document library
2. Share the link with your team
3. Users can open it directly in browser

### 5. Intranet
Host on your company intranet:
```html
<iframe src="/tools/hoodie-photobooth/index.html"
        width="100%"
        height="100%"
        frameborder="0">
</iframe>
```

## 🎯 Use Cases

### Perfect For:
- ✅ Corporate intranets
- ✅ Company events/photo booths
- ✅ Team building activities
- ✅ LinkedIn profile photo generation
- ✅ Employee directory photos
- ✅ Email signature photos
- ✅ Offline usage (no internet required after first load)

### Škoda Auto Specific:
- SAP GCC team branding
- Consistent professional portraits
- Easy team photo generation
- No IT infrastructure required

## 🔍 Troubleshooting

### Hoodies not saving
- **Cause**: Browser in private/incognito mode
- **Solution**: Use normal browser mode for IndexedDB to work

### Can't upload images
- **Cause**: File size too large or wrong format
- **Solution**: Use JPG/PNG under 10MB

### Layout looks broken
- **Cause**: Old browser version
- **Solution**: Update to latest browser version

### Portrait generation fails
- **Cause**: Browser doesn't support Canvas API
- **Solution**: Use modern browser (Chrome, Firefox, Safari, Edge)

### Storage quota exceeded
- **Cause**: Browser storage limit reached (rare)
- **Solution**: Clear browser data for this site and re-upload hoodies

## 📱 Mobile Usage

The app is fully responsive and works on mobile devices:

- **Upload photos**: Use camera or photo library
- **Touch-friendly**: Large buttons and touch targets
- **Portrait mode**: Optimized for vertical screens
- **Share**: Use native share functionality to share results

## 🆚 Standalone vs Full Version

| Feature | Standalone (`index.html`) | Full Version |
|---------|--------------------------|--------------|
| Installation | ✅ None required | ❌ Node.js + Python |
| File count | ✅ 1 file | ❌ 40+ files |
| Dependencies | ✅ Zero | ❌ npm + pip |
| AI Generation | ⚠️ Basic composite | ✅ Advanced AI (Replicate) |
| Deployment | ✅ Drag & drop | ❌ Build + deploy |
| Updates | ✅ Replace 1 file | ❌ Rebuild project |
| Offline | ✅ Fully works | ⚠️ Requires server |
| Speed | ✅ Instant | ⚠️ API calls |

**Recommendation**: Use standalone version unless you need advanced AI features.

## 🎨 Customization

Want to customize the app? Edit `index.html`:

### Change Colors
Look for CSS variables in `<style>`:
```css
:root {
    --skoda-green: #4BA82E;  /* Change this */
    --skoda-black: #000000;
    --skoda-white: #FFFFFF;
}
```

### Change Text
Search for text strings in HTML:
```html
<h1 class="app-title">SAP GCC Hoodie Photo Booth</h1>
```

### Modify Layout
Edit HTML structure and CSS classes directly in the file.

## 📊 Performance

- **File size**: ~50KB (one HTML file)
- **Load time**: Instant (no external resources)
- **Processing time**: 1-3 seconds per portrait
- **Storage**: ~1-2MB for three hoodies
- **Browser memory**: ~50-100MB during operation

## 🔐 Security Notes

### Safe to Use:
- ✅ No external scripts or CDNs
- ✅ No data transmission
- ✅ No cookies or tracking
- ✅ All processing client-side

### Best Practices:
- Host on HTTPS if deploying to web
- Don't modify code if you're not familiar with JavaScript
- Keep browser updated for latest security patches

## 📞 Support

### For Users:
- Read the in-app instructions (click "Instructions" button)
- Check this README
- Contact your IT department

### For Administrators:
- Refer to `HOODIE_IMAGES_GUIDE.md` for hoodie image creation
- Test thoroughly before company-wide deployment
- Consider hosting on company intranet for easy access

## 🎓 Educational

This app demonstrates:
- Modern HTML5 features (Canvas, IndexedDB, FileReader)
- Progressive enhancement
- Client-side image processing
- Responsive design
- Accessible web applications

## 📜 License

This project is proprietary software owned by Škoda Auto a.s.

## 🙏 Credits

- **Škoda Auto** - Corporate identity and branding
- **SAP GCC Team** - Project requirements
- Built with vanilla HTML, CSS, and JavaScript

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│  SAP GCC HOODIE PHOTO BOOTH             │
│  Quick Start Guide                      │
├─────────────────────────────────────────┤
│                                         │
│  1. Open index.html in browser          │
│  2. Upload hoodies (Admin Panel)        │
│  3. Upload face photo                   │
│  4. Select hoodie color                 │
│  5. Generate portrait                   │
│  6. Download result                     │
│                                         │
│  No installation needed!                │
│  Works offline after setup.             │
│                                         │
└─────────────────────────────────────────┘
```

---

Made with ❤️ for Škoda Auto SAP GCC Team

© 2024 Škoda Auto a.s. All rights reserved.

# Neil T. Hagan - Interactive Resume

A modern, dark-themed interactive resume built with HTML, CSS, and vanilla JavaScript.

## Features

✨ **Modern Design**
- Beautiful dark theme with gradient accents
- Smooth animations and transitions
- Responsive layout for all devices

🎯 **Interactive Elements**
- Scroll progress indicator
- Hover effects on sections
- Click-to-copy email functionality
- Print-optimized layout
- Smooth scrolling

⚡ **Performance**
- Pure vanilla JavaScript (no frameworks)
- Optimized animations
- Fast loading times
- Mobile-friendly

## Files

- `resume.html` - Main interactive web resume
- `style.css` - Styling and animations
- `script.js` - Interactive functionality
- `Neil_Hagan_Resume.pdf` - Downloadable PDF version
- `resume-print.html` - Print-optimized HTML (used to generate PDF)

## Deployment to GitHub Pages

### Option 1: Standard Repository

1. **Create a new repository** on GitHub (e.g., `my-resume`)

2. **Upload files:**
   ```bash
   git init
   git add resume.html style.css script.js Neil_Hagan_Resume.pdf README.md
   git commit -m "Initial commit: Interactive resume with PDF download"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/my-resume.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Source", select `main` branch
   - Click Save
   - Your resume will be available at: `https://YOUR_USERNAME.github.io/my-resume/resume.html`

### Option 2: User GitHub Page (Recommended)

For a cleaner URL like `https://YOUR_USERNAME.github.io/`

1. **Create a repository** named exactly: `YOUR_USERNAME.github.io`

2. **Rename `resume.html` to `index.html`:**
   ```bash
   mv resume.html index.html
   ```

3. **Upload files:**
   ```bash
   git init
   git add index.html style.css script.js Neil_Hagan_Resume.pdf README.md
   git commit -m "Initial commit: Interactive resume with PDF download"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
   git push -u origin main
   ```

4. **Access your resume** at: `https://YOUR_USERNAME.github.io/`

## Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --bg-primary: #0a0e27;
    --bg-secondary: #141b3d;
    --accent-primary: #00d4ff;
    --accent-secondary: #667eea;
}
```

### Content
Update the HTML in `resume.html` to modify:
- Contact information
- Job positions
- Skills
- Education

### Regenerating the PDF
After making content changes, regenerate the PDF:
```bash
# Update resume-print.html with your changes, then run:
chromium-browser --headless --disable-gpu --print-to-pdf=Neil_Hagan_Resume.pdf --no-pdf-header-footer resume-print.html
```

Or use the browser print function (Ctrl+P) on `resume-print.html` and save as PDF.

### Features
Toggle optional features in `script.js`:
```javascript
// Uncomment to enable theme toggle
// createThemeToggle();
```

## Keyboard Shortcuts

- `Ctrl + P` - Print resume
- `Ctrl + T` - Scroll to top

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Local Testing

Simply open `resume.html` in your web browser. No build process or server required!

## License

Feel free to use this template for your own resume. Just update the content with your information!

## Contact

Neil T. Hagan - nhagan@corp.mtco.com

---

Built with ❤️ using pure HTML, CSS, and JavaScript

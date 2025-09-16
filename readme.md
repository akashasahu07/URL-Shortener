# 🔗 Modern URL Shortener

A sleek, responsive URL shortener built with vanilla JavaScript and the Bitly API. Features a modern glassmorphism design, dark mode support, and comprehensive error handling.

![URL Shortener Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![CSS3](https://img.shields.io/badge/CSS3-Modern-blue) ![Responsive](https://img.shields.io/badge/Design-Responsive-purple)

## ✨ Features

### 🎨 **Modern Design**
- **Glassmorphism UI** with backdrop blur effects
- **Gradient backgrounds** and smooth animations
- **Responsive design** that works on all devices
- **Dark/Light mode** toggle with system preference detection
- **Font Awesome icons** for professional appearance

### 🔗 **URL Shortening**
- **Real Bitly API integration** for reliable short links
- **Real-time URL validation** with visual feedback
- **Duplicate detection** to prevent unnecessary API calls
- **Comprehensive error handling** for various scenarios

### 🚀 **User Experience**
- **One-click copy** with visual confirmation
- **Keyboard shortcuts** for power users
- **Auto-focus** input field for quick access
- **Loading states** with animated spinners
- **Emoji-enhanced feedback** messages

### ⌨️ **Keyboard Shortcuts**
- `Enter` - Shorten URL
- `Escape` - Clear input and results
- `Ctrl/Cmd + Shift + D` - Toggle dark mode

## 🛠️ **Technical Stack**

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **API**: Bitly REST API v4
- **Icons**: Font Awesome 6.4.0
- **Storage**: localStorage for theme persistence
- **Design**: CSS Grid, Flexbox, CSS Custom Properties

## 🚀 **Quick Start**

### **Prerequisites**
- A modern web browser (Chrome 60+, Firefox 55+, Safari 12+)
- Bitly API access token

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/akashasahu07/URL-Shortener.git
   cd url-shortener
   ```

2. **Get your Bitly API token**
   - Sign up at [Bitly.com](https://bitly.com)
   - Go to Settings → Developer Settings
   - Generate a new access token

3. **Configure the API token**
   ```javascript
   // Replace the token in the JavaScript section
   const ACCESS_TOKEN = "your_bitly_token_here";
   ```

4. **Launch the application**
   - Open `index.html` in your browser
   - Or serve it with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📱 **Responsive Breakpoints**

- **Mobile**: < 640px (Single column, full-width buttons)
- **Tablet**: 641px - 1024px (Optimized spacing)
- **Desktop**: > 1025px (Maximum container width)

## 🎨 **Color Scheme**

### **Light Mode**
- Primary: `#667eea` → `#764ba2` (Gradient)
- Background: `#667eea` → `#764ba2`
- Container: `rgba(255, 255, 255, 0.95)`
- Text: `#1e293b`

### **Dark Mode**
- Primary: `#818cf8` → `#c084fc` (Gradient)
- Background: `#0f0f23` → `#1a1a2e` → `#16213e`
- Container: `rgba(15, 52, 96, 0.85)`
- Text: `#e2e8f0`

## 🔧 **Configuration Options**

### **API Configuration**
```javascript
const ACCESS_TOKEN = "your_bitly_token"; // Replace with your token
const API_URL = "https://api-ssl.bitly.com/v4/shorten"; // Bitly endpoint
```

### **Theme Settings**
```javascript
// Theme persistence
localStorage.setItem('darkMode', 'enabled'); // or 'disabled'
```

### **Message Duration**
```javascript
// Adjust message display time (milliseconds)
setTimeout(() => {
    messageDiv.textContent = '';
}, 5000); // 5 seconds
```

## 🎯 **Browser Support**

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| Opera | 47+ | ✅ Full |

## 🔒 **Security Considerations**

### **API Token Security**
```javascript
// ⚠️ Current implementation (development only)
const ACCESS_TOKEN = "your_token_here";

// ✅ Recommended for production
// Use environment variables or backend proxy
fetch('/api/shorten', {
    method: 'POST',
    body: JSON.stringify({ url: longURL })
});
```

### **Input Validation**
- URL format validation using `new URL()`
- Input sanitization with `trim()`
- HTTPS/HTTP protocol verification

## 🚀 **Performance Features**

- **Modern CSS**: Hardware-accelerated animations
- **Efficient API calls**: Prevents duplicate requests
- **Optimized images**: SVG icons and CSS gradients
- **Minimal dependencies**: No external JavaScript libraries

## 🎨 **Customization**

### **Color Themes**
```css
/* Custom gradient example */
body {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### **Animation Speed**
```css
/* Adjust transition duration */
.btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### **Container Size**
```css
.container {
    max-width: min(90vw, 520px); /* Adjust max width */
}
```

## 📊 **API Rate Limits**

| Plan | Requests/Hour | Requests/Month |
|------|---------------|----------------|
| Free | 1,000 | 1,000 |
| Basic | 10,000 | 10,000 |
| Premium | 100,000 | 100,000 |

## 🐛 **Error Handling**

The application handles various error scenarios:

- **400**: Invalid URL format
- **401**: Invalid/expired API token
- **403**: Insufficient permissions
- **429**: Rate limit exceeded
- **500**: Bitly server error
- **Network**: Connection issues

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow ES6+ standards
- Use semantic HTML5
- Maintain responsive design
- Add appropriate comments
- Test across multiple browsers

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [Bitly API](https://dev.bitly.com/) for URL shortening service
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- [Inter Font](https://rsms.me/inter/) for modern typography
- CSS-Tricks for glassmorphism inspiration

## 📞 **Support**

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/akashasahu07/URL-Shortener/issues) page
2. Create a new issue with detailed description
3. Contact: [your.email@example.com](mailto:akashasahu2001@gmail.com)

---

**Made with ❤️ using modern web technologies**

[⭐ Star this repo](https://github.com/akashasahu07/URL-Shortener) if you found it helpful!
// Bitly API Configuration
const ACCESS_TOKEN = "1828ef6e477f429b580f6204af7855e13c0b268a";

// Dark mode functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load saved theme preference
function loadTheme() {
    const darkMode = localStorage.getItem('darkMode');
    const themeIcon = document.getElementById('theme-icon');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = text;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.className = '';
    }, 5000);
}

// Bitly API Integration
async function shortenURL() {
    const longURL = document.getElementById('urlInput').value.trim();
    const button = event.target;
    const result = document.getElementById('result');
    const apiURL = 'https://api-ssl.bitly.com/v4/shorten';

    if (!longURL) {
        showMessage('Please enter a URL to shorten.', 'error');
        return;
    }

    if (!isValidURL(longURL)) {
        showMessage('Please enter a valid URL (must start with http:// or https://)', 'error');
        return;
    }

    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Shortening...';
    button.disabled = true;

    const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    const data = {
        long_url: longURL
    };

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = 'Failed to shorten URL. ';

            switch (response.status) {
                case 400:
                    errorMessage += 'Invalid URL format or missing parameters.';
                    break;
                case 401:
                    errorMessage += 'Invalid access token. Please check your Bitly credentials.';
                    break;
                case 403:
                    errorMessage += 'Access forbidden. Your token may not have the required permissions.';
                    break;
                case 429:
                    errorMessage += 'Rate limit exceeded. Please try again later.';
                    break;
                case 500:
                    errorMessage += 'Bitly server error. Please try again later.';
                    break;
                default:
                    errorMessage += errorData.message || `HTTP ${response.status}: ${response.statusText}`;
            }

            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        document.getElementById('shortURL').value = responseData.link;
        result.classList.add('show');
        showMessage('🎉 URL shortened successfully with Bitly!', 'success');

    } catch (error) {
        console.error('Bitly API Error:', error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showMessage('❌ Network error. Please check your internet connection and try again.', 'error');
        } else {
            showMessage(`❌ ${error.message}`, 'error');
        }
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

async function copyToClipboard() {
    const shortURLInput = document.getElementById('shortURL');

    if (!shortURLInput.value) {
        showMessage('No URL to copy. Please shorten a URL first.', 'error');
        return;
    }

    try {
        // Modern clipboard API with fallback
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shortURLInput.value);
        } else {
            // Fallback for older browsers and HTTP contexts
            shortURLInput.select();
            shortURLInput.setSelectionRange(0, 99999); // For mobile devices
            const successful = document.execCommand('copy');
            if (!successful) {
                throw new Error('Copy command failed');
            }
        }

        showMessage('📋 Short URL copied to clipboard!', 'success');

        // Visual feedback - briefly highlight the input
        const originalBackground = shortURLInput.style.background;
        shortURLInput.style.background = 'rgba(16, 185, 129, 0.2)';
        shortURLInput.style.transition = 'background 0.3s ease';

        setTimeout(() => {
            shortURLInput.style.background = originalBackground;
        }, 1000);

    } catch (error) {
        console.error('Copy failed:', error);
        showMessage('❌ Failed to copy URL. Please select and copy manually.', 'error');
        // Select the text for manual copying
        shortURLInput.select();
        shortURLInput.setSelectionRange(0, 99999);
    }
}

// Enhanced keyboard and UI interactions
document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('urlInput');

    // Auto-focus the input field
    urlInput.focus();

    // Allow Enter key to trigger shortening
    urlInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            shortenURL();
        }
    });

    // Clear input and results on Escape key
    urlInput.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            urlInput.value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('shortURL').value = '';
            showMessage('', ''); // Clear any messages
        }
    });

    // Real-time URL validation with visual feedback
    urlInput.addEventListener('input', function () {
        const value = this.value.trim();

        if (value && !isValidURL(value)) {
            this.style.borderColor = '#ef4444';
            this.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.2)';
        } else {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }
    });
});

// Keyboard shortcut for theme toggle
document.addEventListener('keydown', function (event) {
    // Ctrl/Cmd + Shift + D to toggle theme
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        toggleTheme();

        let mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

        // Capitalize first letter
        mode = mode.charAt(0).toUpperCase() + mode.slice(1);

        const icon = mode === 'Dark'
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';

        showMessage(`${icon} Switched to ${mode} mode`, 'success');
    }
});

// Analytics and usage tracking (optional)
function trackURLShorten(success, error = null) {
    // You can integrate with analytics services here
    console.log('URL Shorten Event:', {
        success,
        error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

// Enhanced error reporting for debugging
window.addEventListener('error', function (event) {
    console.error('Global Error:', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error
    });
});
const ACCESS_TOKEN = "YOUR_BITLY_ACCESS_TOKEN";

async function shortenURL() {
    const longURL = document.getElementById('longURL').value;
    const apiURL = 'https://api-ssl.bitly.com/v4/shorten';

    if (!longURL) {
        alert('Please enter a URL to shorten.');
        return;
    }

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
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('shortURL').value = result.link;
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}

function copyToClipboard() {
    const  shortURLInput = document.getElementById('shortURL');

    if (!shortURLInput.value) {
        alert('No URL to copy. Please shorten a URL first.');
        return;
    }

    shortURLInput.select();
    document.execCommand('copy');
    alert('Short URL copied to clipboard!');
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (e.g., CSS, JS, images)
app.use(express.static('public'));

app.get('/', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Asyraf's React App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                color: #333;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #2c3e50;
            }
            p {
                font-size: 1.2em;
            }
            a {
                color: #3498db;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Devops Defender React App!</h1>
        <p>Your React app is running smoothly.</p>
        <p>Check the server status: <a href="/health">Health Check</a></p>
        <p>Stop the server: <a href="/exit">Stop Server</a></p>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

app.get('/health', (req, res) => {
    // Perform actions to check the health of the server
    // For example, check the database connection, check the server memory, etc.
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    });
});

app.get('/exit', (req, res) => {
    // Perform actions to stop the server or any other desired actions
    res.send('Server stopped');
    process.exit(0); // This stops the server (not recommended in production)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

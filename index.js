const express = require('express');
const path = require('path');
const app = express();
const client = require('prom-client');
const PORT = process.env.PORT || 3001;

// Collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
    res.send('Server is healthy');

    // Perform actions to check the health of the server
    // For example, check the database connection, check the server memory, etc.

});

app.get("/metrics", async (req, res) => {
    try {
        res.setHeader("Content-Type", client.register.contentType);
        const metrics = await client.register.metrics();
        res.send(metrics);
    } catch (err) {
        res.status(500).send('Error collecting metrics');
    }
});

app.get('/exit', (req, res) => {
    // Perform actions to stop the server or any other desired actions
    res.send('Server stopped');
    process.exit(0); // This stops the server (not recommended in production)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

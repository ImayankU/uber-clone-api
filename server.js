const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Start the server and handle potential errors
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Gracefully shutdown the server on termination signals
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0); // Exit the process after the server has shut down
    });
});

process.on('SIGTERM', () => {
    console.log('Server shutting down...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0); // Exit the process after the server has shut down
    });
});

// Error handling for server startup
server.on('error', (err) => {
    console.error('Error starting server:', err);
});

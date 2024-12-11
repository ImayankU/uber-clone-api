const mongoose = require('mongoose');

async function connectToDb() {
    try {
        // Use async/await for a cleaner syntax
        await mongoose.connect(process.env.DB_CONNECT)
            
        console.log('Connected to DB');
    } catch (err) {
        // Improved error logging
        console.error('Error connecting to DB:', err.message);
        process.exit(1); // Exit process if DB connection fails
    }
}

// Handle graceful shutdown for DB
process.on('SIGINT', async () => {
    console.log('Shutting down DB connection...');
    await mongoose.connection.close();
    console.log('DB connection closed');
    process.exit(0); // Exit after closing the DB connection
});

module.exports = connectToDb;

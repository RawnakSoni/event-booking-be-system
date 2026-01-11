require('dotenv').config();
const mongoose = require('mongoose');
require('./src/models/User');
require('./src/models/Event');
require('./src/models/Booking');

async function clear() {
    await mongoose.connect(process.env.MONGODB_URI);
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({});
    }
    console.log('Database cleared');
    process.exit(0);
}

clear().catch(err => {
    console.error(err);
    process.exit(1);
});

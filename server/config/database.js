import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    const uri = (process.env.MONGODB_URI || process.env.Mongo_URL || 'mongodb://localhost:27017/GoElectriQ').trim();
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    if (error.message && error.message.includes('whitelist')) {
      console.error('\n📌 Atlas IP / connection tips:');
      console.error('   1. In Atlas → Network Access → wait until "deploying your changes" finishes.');
      console.error('   2. Ensure 0.0.0.0/0 (or your current IP) is in the IP Access List and Status is Active.');
      console.error('   3. Check Database Access: user password must match the one in server/.env (MONGODB_URI).');
      console.error('   4. If you use local MongoDB instead, set MONGODB_URI=mongodb://127.0.0.1:27017/GoElectriQ in server/.env\n');
    }
    process.exit(1);
  }
};

export default connectDB;
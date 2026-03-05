import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/database.js';

dotenv.config();

const ADMIN_EMAIL = 'admin@goelectriq.com';
const ADMIN_PASSWORD = 'Admin@123';

async function seedAdmin() {
  try {
    await connectDB();

    let admin = await User.findOne({ email: ADMIN_EMAIL });
    if (admin) {
      admin.role = 'admin';
      await admin.save();
      console.log('✅ Existing admin user updated to admin role');
    } else {
      admin = await User.create({
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Admin user created successfully');
    }

    console.log('\n========================================');
    console.log('   ADMIN LOGIN CREDENTIALS');
    console.log('========================================');
    console.log('   Email:    ' + ADMIN_EMAIL);
    console.log('   Password: ' + ADMIN_PASSWORD);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedAdmin();

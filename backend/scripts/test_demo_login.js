const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      identifier: 'customer.demo@busbooking.com',
      password: 'Customer@123'
    });

  console.log('Login Response Code:', res.statusCode);
  if (res.statusCode === 200) {
    console.log('Login Success!');
    console.log('Token Received:', !!res.body.token);
    console.log('User Role:', res.body.user.role);
  } else {
    console.log('Login Failed:', res.body);
  }

  process.exit(0);
}

run();

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Vehicle = require('../src/models/Vehicle');
const User = require('../src/models/User');

const DB_URI = process.env.MONGODB_URI;

const buses = [
  {
    vehicleSource: 'OWN',
    vehicleNumber: 'BA 1 KHA 3001',
    vehicleName: 'Demo Tata Bus',
    vehicleModel: 'Tata Bus',
    vehicleType: 'Bus',
    vehicleCategory: 'Standard AC',
    seatingCapacity: 40,
    ownerName: 'Demo Owner',
    ownerMobileNumber: '9800000000',
    vehicleStatus: 'Active',
    route: {
      origin: 'Kathmandu',
      destination: 'Pokhara'
    },
    busDetails: {
      busType: 'AC Seater',
      seatLayout: '2+2',
      availableSeats: 40
    },
    vehicleImages: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80']
  },
  {
    vehicleSource: 'OWN',
    vehicleNumber: 'BA 1 KHA 3002',
    vehicleName: 'Demo Ashok Leyland',
    vehicleModel: 'Ashok Leyland',
    vehicleType: 'Bus',
    vehicleCategory: 'Standard AC',
    seatingCapacity: 45,
    ownerName: 'Demo Owner',
    ownerMobileNumber: '9800000000',
    vehicleStatus: 'Active',
    route: {
      origin: 'Kathmandu',
      destination: 'Birgunj'
    },
    busDetails: {
      busType: 'AC Seater',
      seatLayout: '2+2',
      availableSeats: 45
    },
    vehicleImages: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80']
  },
  {
    vehicleSource: 'OWN',
    vehicleNumber: 'BA 1 KHA 3003',
    vehicleName: 'Demo Tata Starbus',
    vehicleModel: 'Tata Starbus',
    vehicleType: 'Bus',
    vehicleCategory: 'Standard Non-AC',
    seatingCapacity: 40,
    ownerName: 'Demo Owner',
    ownerMobileNumber: '9800000000',
    vehicleStatus: 'Active',
    route: {
      origin: 'Kathmandu',
      destination: 'Nepalgunj'
    },
    busDetails: {
      busType: 'Non-AC',
      seatLayout: '2+2',
      availableSeats: 40
    },
    vehicleImages: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80']
  }
];

const customer = {
  name: 'Demo Customer',
  email: 'customer.demo@busbooking.com',
  password: 'Customer@123',
  phone: '9812345678',
  role: 'customer',
  status: 'Active'
};

async function seed() {
  console.log('Connecting to DB...');
  await mongoose.connect(DB_URI);
  
  const dbName = mongoose.connection.db.databaseName;
  console.log(`\nDatabase used: ${dbName}\n`);

  console.log('--- BUSES ---');
  for (const busData of buses) {
    const existing = await Vehicle.findOne({ vehicleNumber: busData.vehicleNumber });
    if (existing) {
      console.log(`${busData.vehicleNumber} -> Already exists`);
    } else {
      await new Vehicle(busData).save();
      console.log(`${busData.vehicleNumber} -> Created`);
    }
  }

  console.log('\n--- CUSTOMER ---');
  const existingUser = await User.findOne({ email: customer.email });
  if (existingUser) {
    console.log(`Email: ${customer.email}\nRole: ${existingUser.role}\nCreated/Already exists: Already exists`);
  } else {
    const newUser = new User(customer);
    await newUser.save();
    console.log(`Email: ${newUser.email}\nRole: ${newUser.role}\nCreated/Already exists: Created`);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

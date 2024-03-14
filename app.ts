const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
import mongoose from "mongoose";
import productRoutes from './routes/productRoutes';

import productRouter from "./routes/product";
import { Category } from "./models/productModel";
// MongoDB connection string with useNewUrlParser option included
require('dotenv').config();
const MONGODB_URI: string = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}
console.log('MongoDB URI:', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, 
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });




// Create Express server
const app = express(); 
const port = 8080; 


// Express configuration
app.use(cors()); 
app.use(helmet()); 
app.use(morgan("dev")); 
app.use(express.json());

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

app.get('/get-user-data', (req: { ip: any; }, res: { json: (arg0: { userIP: any; }) => void; }) => {
  const userIP = req.ip

  console.log('User IP:', userIP);
  


  res.json({ userIP });
});

app.use('/products', productRoutes);

// hello world route
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("Hello, world!");
}
);

// // Function to insert sample categories
// const insertSampleCategories = async () => {
//   try {
//     // Check if there are already categories in the database
//     const existingCategories = await Category.find();
//     if (existingCategories.length > 0) {
//       console.log("Categories already exist in the database.");
//       return;
//     }


//      // Sample categories data
// const sampleCategoriesData = [
//   { name: "Man" },
//   { name: "Woman" },
//   { name: "Baby" },
//   { name: "Electronics" },
//   { name: "Home & Kitchen" },
//   { name: "Books & Literature" },
//   { name: "Fashion" },
//   { name: "Beauty & Personal Care" },
//   { name: "Health & Fitness" },
//   { name: "Toys & Games" },
//   { name: "Sports & Outdoors" },
//   { name: "Automotive" },
//   { name: "Food & Beverages" },
//   { name: "Pets" },
//   { name: "Office & Stationery" },
//   { name: "Travel & Leisure" },
//   // Add more categories as needed
// ];


//     // Insert sample categories into the database
//     await Category.insertMany(sampleCategoriesData);
//     console.log("Sample categories inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting sample categories:", error);
//   }
// };

// // Insert sample categories when the server starts
// insertSampleCategories();










// Export Express app
module.exports = app;

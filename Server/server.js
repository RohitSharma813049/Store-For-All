import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { connectDB } from "./src/configs/Db.js";
import redisClient from "./src/configs/Redis.js";

import userRoutes from "./src/routes/User.routes.js";
import productRoutes from "./src/routes/Product.route.js";
import orderRoutes from "./src/routes/Ouders.route.js";
import paymentRoutes from "./src/routes/Payments.route.js";
import authRoutes from "./src/routes/Auth.route.js";
import adminRoutes from "./src/routes/Admin.route.js";
import supportRoutes from "./src/routes/Support.route.js";
import marketingRoutes from "./src/routes/Marketing.route.js";
import managerRoutes from "./src/routes/Manager.route.js";
import technicianRoutes from "./src/routes/Technician.route.js";
import deliveryRoutes from "./src/routes/Delivery.route.js";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send('Hello World');
});

// Connect to database and Redis
connectDB();
await redisClient.connect();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/technician', technicianRoutes);
app.use('/api/delivery', deliveryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
});
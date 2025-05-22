import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhookes from "./controllers/clerkWebhooks.js";
import userRouter from "./routers/userRouters.js";
import hotelRoutes from "./routers/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routers/roomRoutes.js";
import bookingRouter from "./routers/bookingRouters.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors()); // Enable CORS for all routes

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to clerk webhooks
app.use("/api/clerk", clerkWebhookes);

app.get("/", (req, res) => res.send("API is working!"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

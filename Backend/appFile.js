import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleWares/err.js";
import cors from "cors";

// route imports
const app = express();

// CORS middleware (must be first)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Explicitly handle all OPTIONS requests for CORS preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json())
app.use(cookieParser())

// route imports
import SchollershipRouter from "./routes/ScollershipRoute.js";
import bankrouter from "./routes/BankRoutes.js";
import userRoute from "./routes/UserRoute.js";
import adminRouter from "./routes/adminroute.js";

// using the routes
// Commenting out the root route to avoid interfering with API routes
// app.use("/",(req,res,next)=>{
//     res.send("Hello Your server is working")
// })
app.use("/api/v1", SchollershipRouter);
app.use("/api/v2", userRoute);
app.use("/api/v3", bankrouter);
app.use("/api/v1", adminRouter);

// middleware to handle errors
app.use(errorMiddleware);

export default app;
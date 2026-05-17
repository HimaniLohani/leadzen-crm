import cors from "cors";
import express from "express";
import leadRoutes from "./routes/leadRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);

export default app;
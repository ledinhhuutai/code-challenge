import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use(itemsRoutes);
app.use(errorHandler);

export default app;
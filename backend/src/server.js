import express from "express";
import cors from "cors";
import "dotenv/config.js";
import path from "path";
import noteRouter from "./router/notesRoute.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import { fileURLToPath } from "url";

const app = express();
await connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV !== "production"){
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
}

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("{/*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

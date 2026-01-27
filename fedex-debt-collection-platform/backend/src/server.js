import express from "express";
import cors from "cors";
import caseRoutes from "./routes/caseRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", caseRoutes);
app.use("/api", assignmentRoutes);
app.use("/api", performanceRoutes);
app.use("/api", reportRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (_, res) => res.send("Backend Running"));

app.listen(5000, () => console.log("Backend running on port 5000"));

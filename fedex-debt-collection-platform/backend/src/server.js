import express from "express";
import cors from "cors";
import caseRoutes from "./routes/index.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", caseRoutes);
app.use("/api", performanceRoutes);
app.use("/api", reportRoutes);
app.get("/", (_, res) => res.send("Backend Running"));

app.listen(5000, () => console.log("Backend running on port 5000"));

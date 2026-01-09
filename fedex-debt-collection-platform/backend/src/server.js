import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api", performanceRoutes);
app.use("/api", assignmentRoutes);
app.get("/", (_, res) => res.send("Backend Running"));

app.listen(5000, () => console.log("Server on 5000"));

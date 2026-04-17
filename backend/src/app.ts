import express from "express";
import { AppDataSource } from "./config/data-source";
import featureRoutes from "./routes/feature.routes";
import authRoutes from "./routes/auth.routes";
import orgRoutes from "./routes/organization.routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


app.use(cors());

app.use("/auth", authRoutes);
app.use("/organizations", orgRoutes);
app.use("/features", featureRoutes);


AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
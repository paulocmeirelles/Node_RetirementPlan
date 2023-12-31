import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./app/doc/doc.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

// Initialing express
const app = express();

// Routes
// import associations from "./app/main/models/associations.js";
import clientRoute from "./app/routes/client.route.js";
import contributionRoute from "./app/routes/contribution.route.js";
import planRoute from "./app/routes/plan.route.js";
import productRoute from "./app/routes/product.route.js";
import withdrawRoute from "./app/routes/withdraw.route.js";
app.use("/api/clients", clientRoute);
app.use("/api/contributions", contributionRoute);
app.use("/api/plans", planRoute);
app.use("/api/products", productRoute);
app.use("/api/withdraw", withdrawRoute);

// Setting environment variables
dotenv.config();

// Setting express
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// Setting route to documentation
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Starting API
app.listen(process.env.PORT, () =>
  console.log(`API working on PORT ${process.env.PORT}`)
);

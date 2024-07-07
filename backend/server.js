require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/collection");
const userRoutes = require("./routes/user");

//Express app
const app = express();
const port = process.env.PORT || "4000";

//MiddleWare
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routers
app.use("/api/details", employeeRoutes);
app.use("/api/user", userRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listening port
    app.listen(port, () => {
      console.log(`Connected to DB & listening on port:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

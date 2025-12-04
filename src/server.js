
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AppDataSource = require("./config/database");
const carsRoutes = require("./routes/carsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/cars", carsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Cars-Factory API Server",
    endpoints: {
      cars: {
        "GET /api/cars/brand?brand=<CarBrand>": "Get all cars by brand",
        "POST /api/cars": "Add a new car",
        "PUT /api/cars/:id": "Edit a car by ID",
        "DELETE /api/cars?id=1": "Delete a car by ID",
      },
    },
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

module.exports = app;

const carService = require("../services/carService");

class CarsController {
  async getAllCarsByBrand(req, res) {
    try {
      const { brand } = req.query;
      if (!brand) return res.status(400).json({ error: "Brand is required" });
      const cars = await carService.getAllCarsByBrand(brand);
      res.json(cars);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addCar(req, res) {
    try {
      const { model, brand, registrationNumber, price } = req.body;
      if (!model || !brand || !registrationNumber || price === undefined) {
        return res.status(400).json({ error: "All fields are required" });
      }

    // Validate model and brand: at least 2 letters, no special symbols
    const namePattern = /^[A-Za-z0-9\s]{2,}$/;
    if (!namePattern.test(model)) {
      return res.status(400).json({
        error: "Model must be at least 2 characters and cannot contain special symbols (! ? . , etc.)"
      });
    }
    if (!namePattern.test(brand)) {
      return res.status(400).json({
        error: "Brand must be at least 2 characters and cannot contain special symbols (! ? . , etc.)"
      });
    }

      // Registration number validation
      const regPattern = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
      if (!regPattern.test(registrationNumber)) {
        return res.status(400).json({
          error: "Registration number must be in format: 2 letters, 4 digits, 2 letters (e.g., AB1234CD)"
        });
      }

      const car = await carService.addCar({ model, brand, registrationNumber, price });
      res.status(201).json(car);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  
async editCar(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Valid Car ID is required" });
    }

    const { model, brand, registrationNumber, price } = req.body;
    const updates = {};

    // Validate and add fields only if they exist
    if (model !== undefined) {
      const namePattern = /^[A-Za-z0-9\s]{2,}$/;
      if (!namePattern.test(model)) {
        return res.status(400).json({
          error: "Model must be at least 2 characters and cannot contain special symbols (! ? . , etc.)"
        });
      }
      updates.model = model;
    }

    if (brand !== undefined) {
      const namePattern = /^[A-Za-z0-9\s]{2,}$/;
      if (!namePattern.test(brand)) {
        return res.status(400).json({
          error: "Brand must be at least 2 characters and cannot contain special symbols (! ? . , etc.)"
        });
      }
      updates.brand = brand;
    }

    if (registrationNumber !== undefined) {
      const regPattern = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
      if (!regPattern.test(registrationNumber)) {
        return res.status(400).json({
          error: "Registration number must be in format: 2 letters, 4 digits, 2 letters (e.g., AB1234CD)"
        });
      }
      updates.registrationNumber = registrationNumber;
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ error: "Price must be a positive number" });
      }
      updates.price = price;
    }

    // If no valid fields provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    const updatedCar = await carService.editCar(id, updates);
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


  async deleteCar(req, res) {
    try {
      const id = parseInt(req.query.id, 10);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Valid Car ID is required" });
      }

    await carService.deleteCar(id);
    res.json({ message: "Car deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CarsController();

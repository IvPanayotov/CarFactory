const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController");

/*
Curl usage:
            curl -X GET "http://localhost:3000/api/cars/brand?brand=Audi"
 */
// GET /api/cars/brand?brand=Audi
router.get("/brand", (req, res) => carsController.getAllCarsByBrand(req, res));

/*Curl usage:
            curl -X POST http://localhost:3000/api/cars \
            -H "Content-Type: application/json" \
            -d '{"model":"A6","brand":"Audi","registrationNumber":"SV12357PA","price":25000}'
*/
// POST /api/cars
router.post("/", (req, res) => carsController.addCar(req, res));

// PUT /api/cars/:id
/*Curl usage:
            curl -X PUT http://localhost:3000/api/cars/2 \
            -H "Content-Type: application/json" \
            -d '{"model":"A6","brand":"Audi","registrationNumber":"SV12357PA","price":25000}'
*/
router.put("/:id", (req, res) => carsController.editCar(req, res));

// DELETE /api/cars?id=1
//curl usage: curl -X DELETE "http://localhost:3000/api/cars?id=1"
router.delete("/", (req, res) => carsController.deleteCar(req, res));

module.exports = router;

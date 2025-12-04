const AppDataSource = require("../config/database");

class CarService {
  constructor() {
    this.repo = AppDataSource.getRepository("Car");
  }

  async getAllCarsByBrand(brand) {
    return this.repo.find({ where: { brand } });
  }

  async addCar(data) {
    const existing = await this.repo.findOne({ where: { registrationNumber: data.registrationNumber } });
    if (existing) throw new Error("Registration number already exists");
    const car = this.repo.create(data);
    return this.repo.save(car);
  }

  async editCar(id, data) {
    const car = await this.repo.findOne({ where: { id } });
    if (!car) throw new Error("Car not found");
    Object.assign(car, data);
    return this.repo.save(car);
  }

  async deleteCar(id) {
    const car = await this.repo.findOne({ where: { id } });
    if (!car) throw new Error("Car not found");
    await this.repo.remove(car);
    return true;
  }
}

module.exports = new CarService();

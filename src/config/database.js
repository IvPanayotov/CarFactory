const { DataSource } = require("typeorm");
const Car = require("../entities/Car");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "CarFactory.sqlite",
  synchronize: true,
  logging: false,
  entities: [Car],
});

module.exports = AppDataSource;

const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Car",
  tableName: "cars",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    model: {
      type: "varchar",
      nullable: false,
      length: 100,
    },
    brand: {
      type: "varchar",
      nullable: false,
    },
    registrationNumber: {
      type: "varchar",
      nullable: true,
      length: 100,
      unique: true,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
  },
});

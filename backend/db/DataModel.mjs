import { DataTypes } from "sequelize";
import sequelize from "./config.mjs";

const Data = sequelize.define("data", {
  content: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Data;

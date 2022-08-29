import Sequelize from "sequelize";

const sequelize = new Sequelize("expectoo_dev_db", "postgres", "Kaycee<3", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;

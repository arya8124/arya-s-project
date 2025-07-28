import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ecommerce", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;

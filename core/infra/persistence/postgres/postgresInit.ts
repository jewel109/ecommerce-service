import Sequelize from "@sequelize/core";
import Customer from "../../../domain/models/customer/Customer";
import { PostgresDialect } from "@sequelize/postgres";
import { loadEnvFile } from "process";
import { dbName, dbPass, dbUserName, loadEnvVariables } from "../../../../utils/configUtils";
import Product from "../../../domain/models/products/Product";
import Order from "../../../domain/models/order/Order";
// import { User } from "../core/domain/models/user/User";

// export const sequelize = new Sequelize("mydatabase", "myuser", "mypassword", {
//   host: 'localhost', port: 5432, dialect: "postgres",
// })
// console.log("in InitializePostgres ", dbName)
// console.log(dbPass)

export const sequelize = new Sequelize({
  user: dbUserName,
  password: dbPass,
  database: dbName,
  dialect: PostgresDialect,
  models: [Customer, Product, Order]
})

export const InitializePostgres = async () => {

  try {
    await sequelize.sync({ alter: true })
    // await Customer.sync({ force: true })
    // console.log("Database synchronized")
  } catch (error) {
    console.log("unable to synchronize the db", error)

  }
}



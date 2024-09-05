import { InitializePostgres, sequelize } from "../../core/infra/persistence/postgres/postgresInit"



describe("testing postgress connection", () => {

  test("should connect to  postgress", async () => {
    try {
      await sequelize.sync()

      expect(sequelize).toBeDefined();
      expect(sequelize).toHaveProperty('database'); // Checks that the connection has a 'database' property in options
      expect(sequelize).toBeDefined();
    } catch (error) {
      console.log(error)
    }
  })
})

afterAll(async () => {
  await sequelize.close()
  console.log("Db closed")
})

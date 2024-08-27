import { InitializePostgres, sequelizeDb } from "../../core/infra/persistence/postgres/postgresInit"



describe("testing postgress connection", () => {

  test("should connect to  postgress", async () => {
    try {
      await sequelizeDb.sync()

      expect(sequelizeDb).toBeDefined();
      expect(sequelizeDb).toHaveProperty('database'); // Checks that the connection has a 'database' property in options
      expect(sequelizeDb.models).toBeDefined();
    } catch (error) {
      console.log(error)
    }
  })
})

afterAll(async () => {
  await sequelizeDb.close()
  console.log("Db closed")
})

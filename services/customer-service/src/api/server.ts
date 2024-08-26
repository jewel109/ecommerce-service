import express from "express";
import { setupMiddleWares } from "./middlewares/setupMiddlewares";
import { InitializePostgres } from "../core/infra/persistence/postgres/postgresInit";
import { port } from "../utils/configUtils";
InitializePostgres()


const app = express()

setupMiddleWares(app)

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server listening in port ${port}`)
  })

}


export default app

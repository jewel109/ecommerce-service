import cors from 'cors'
import express, { Application } from 'express'
import { emptyOrUnknownRouteHandler } from '../controllers/utilsController'
import { baseRouter } from '../routes/baseRoute'

export const setupMiddleWares = (app: Application) => {
  app.use(express.json())
  app.use(cors())
  app.use(baseRouter)
  app.use("*", emptyOrUnknownRouteHandler)
}

import express, { Application } from 'express'
import cors from 'cors'
import { customerRouter } from '../routes/customerRoute'
import { emptyOrUnknownRouteHandler } from '../controllers/utilsController'

export const setupMiddleWares = (app: Application) => {
  app.use(express.json())
  app.use(cors())
  app.use(customerRouter)
  app.use("*", emptyOrUnknownRouteHandler)
}

import express, { Request, Response } from 'express'
import { createCustomerController, loginCustomerController } from '../controllers/customerAuthController'
import { withRequest } from '../../utils/controllerUtils'
import { authDataController, getPrivateAccessController, tokenSendingController } from '../controllers/utilsController'

export const customerRouter = express.Router()


customerRouter.post("/register", createCustomerController)
customerRouter.post("/login", loginCustomerController, tokenSendingController)
customerRouter.post("/auth", getPrivateAccessController, authDataController)


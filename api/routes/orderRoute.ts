import express from 'express'
import { createOrderController } from '../controllers/order/orderController'
import { getPrivateAccessController } from '../controllers/utilsController'
import { getAuthenticUser } from '../controllers/customerAuthController'


export const orderRouter = express.Router()

orderRouter.use(getPrivateAccessController, getAuthenticUser)

orderRouter.post('/add', createOrderController)

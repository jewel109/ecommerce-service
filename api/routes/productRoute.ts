
import express from 'express'
import { authDataController, getPrivateAccessController } from '../controllers/utilsController'
import { productAddingController } from '../controllers/product/productMiddleware'
export const productRouter = express.Router()

productRouter.use(getPrivateAccessController)

productRouter.post('/add', getPrivateAccessController, productAddingController)

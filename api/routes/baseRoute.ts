
import express from 'express'
import { customerRouter } from './customerRoute'
import { productRouter } from './productRoute'
import { orderRouter } from './orderRoute'
import { paymentRouter } from './paymentroute'


export const baseRouter = express.Router()


baseRouter.use("/api/v1/customer", customerRouter)
baseRouter.use('/api/v1/product', productRouter)
baseRouter.use('/api/v1/order', orderRouter)
baseRouter.use('/api/v1/payment', paymentRouter)


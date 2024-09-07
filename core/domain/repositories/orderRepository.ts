import { Model } from "@sequelize/core";
import { createDefaultResponse, RepositoryResponse } from "../../../utils/controllerUtils";
import Order, { OrderAttributes } from "../models/order/Order";



class OrderRepository {

  async create({ orderStatus = "pending", customerId, totalAmount }: OrderAttributes): Promise<RepositoryResponse<OrderAttributes>> {

    try {

      const orderData = await Order.create({ totalAmount, customerId, orderStatus })

      if (!orderData) return createDefaultResponse({ msg: "Order is not created", statusCode: 404, })


      return createDefaultResponse({ msg: "Order created successfully", statusCode: 201, data: orderData, status: "success" })
    } catch (er) {
      const e = er as Error
      console.log(e)
      return createDefaultResponse({ msg: e.message, statusCode: 500, })
    }
  }
}

export const orderService = new OrderRepository()

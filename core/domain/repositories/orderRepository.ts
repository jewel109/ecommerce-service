import { Model } from "@sequelize/core";
import { createDefaultResponse, RepositoryResponse } from "../../../utils/controllerUtils";
import Order, { OrderAttributes } from "../models/order/Order";



class OrderRepository {

  async create({ id, status, customerId, totalAmount }: OrderAttributes): Promise<RepositoryResponse> {

    try {

      const orderData = await Order.create({ totalAmount, customerId, status: "pending", id })

      if (!orderData) return createDefaultResponse({ msg: "Order is not created", statusCode: 404, })


      return createDefaultResponse({ msg: "Order created successfully", statusCode: 201, data: orderData, status: "success" })
    } catch (er) {
      const e = er as Error
      return createDefaultResponse({ msg: e.message, statusCode: 500, data: "Server Error" })
    }
  }
}

export const orderService = new OrderRepository()

import { OrderAttributes } from "../../../core/domain/models/order/Order";
import { orderService } from "../../../core/domain/repositories/orderRepository";
import { AuthenticatedRequest, DataWithRequest } from "../../../utils/authUtils";
import { sendResponse, withRequest } from "../../../utils/controllerUtils";


export const createOrderController = withRequest<DataWithRequest>(async (req, res) => {

  try {

    const user = req.user
    const customerData = req.data

    // console.log("token customerData ", user)
    // console.log("customerData ", customerData)

    const { status: orderStatus, id, customerId, totalAmount }: OrderAttributes = req.body

    if (!orderStatus || !id || !customerId || !totalAmount) {
      return sendResponse(res, { msg: "order data is not provided", statusCode: 404 })

    }

    const { status, msg, statusCode, data } = await orderService.create({ status: orderStatus, totalAmount, customerId, id })
    return sendResponse(res, { msg, statusCode, status, data })

  } catch (error) {
    const e = error as Error
    return sendResponse(res, { msg: e.message, statusCode: 500 })
  }


})


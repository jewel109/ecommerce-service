import { OrderAttributes } from "../../../core/domain/models/order/Order";
import { orderService } from "../../../core/domain/repositories/orderRepository";
import { kafkaInstance } from "../../../core/infra/services/kafkaDefaults";
import { DataWithRequest } from "../../../utils/authUtils";
import { RepositoryResponse, sendResponse, withRequest } from "../../../utils/controllerUtils";
import { adminCreation, createTopic, creatingKafkaInstance, creatingProducer, KafkaCustomConfig, sendingMessage } from "../../../utils/kafkaUtils";



export const createOrderController = withRequest<DataWithRequest>(async (req, res) => {

  try {

    const user = req.user
    const customerData = req.data

    // console.log("token customerData ", user)
    // console.log("customerData ", customerData)

    const { orderStatus, customerId, totalAmount }: OrderAttributes = req.body

    if (!orderStatus || !customerId || !totalAmount) {
      return sendResponse(res, { msg: "order data is not provided", statusCode: 404 })

    }


    const { status, msg, statusCode, data } = await orderService.create({ orderStatus, totalAmount, customerId })
    const admin = await adminCreation(kafkaInstance)
    await createTopic(admin, 'order')


    const producer = await creatingProducer(kafkaInstance)
    await sendingMessage(producer, 'order', [{ key: JSON.stringify(1), value: JSON.stringify(data) }])

    return sendResponse(res, { msg, statusCode, status, data })

  } catch (error) {
    const e = error as Error
    console.log(e)
    return sendResponse(res, { msg: e.message, statusCode: 500 })
  }


})


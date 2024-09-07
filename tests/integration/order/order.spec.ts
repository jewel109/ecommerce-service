import request from 'supertest'
import { CustomerAttributes } from "../../../core/domain/models/customer/Customer"
import { OrderAttributes } from "../../../core/domain/models/order/Order"
import { ProductAttributes } from "../../../core/domain/models/products/Product"
import { sequelize } from "../../../core/infra/persistence/postgres/postgresInit"
import { url } from "../../../utils/configUtils"
import { STATUS_CODE_201, SUCCMSG } from "../../../utils/controllerUtils"
import { SuperTestResponse, token } from "../../../utils/testUtils"
import { createProductTest } from "../product/product.spec"
import { adminCreation, deleteTopic } from '../../../utils/kafkaUtils'
import { kafkaInstance } from '../../../core/infra/services/kafkaDefaults'

// register and loggeed in a customer 
// creation of a product
// creation of order 
//
//
//


export const orderData: OrderAttributes = {
  customerId: 1,
  totalAmount: 40,
  orderStatus: "pending"
}


const productData: ProductAttributes = {
  name: 'light',
  catagory: 'electronics',
  description: "light will pull out dark",
  price: 20,
  stock: 3
}
const customerData: CustomerAttributes = { email: "jewelrana@gmail.com", password: "1253", name: "raihan" }




beforeAll(async () => {
  try {
    await sequelize.destroyAll()

    const admin = await adminCreation(kafkaInstance)
    await deleteTopic(admin, 'order')

  } catch (error) {
    console.log(error)
  }
})



export const orderTest = async (orderData: OrderAttributes, token: string) =>
  await request(url).post('/api/v1/order/add').send(orderData).set('Authorization', `bearer ${token}`) as SuperTestResponse



describe("Handling product creation and order creation", () => {

  test("should create a product", async () => {


    console.log("token in create product ", token)
    const { body: { status, msg, data }, statusCode } = await createProductTest(productData, token)


    expect(msg).toBe(SUCCMSG)
    expect(status).toBe("success")
  })



  test("Should make an order", async () => {

    const { body: { status, msg, data }, statusCode } = await orderTest(orderData, token)
    expect(msg).toBe("Order created successfully")
    expect(statusCode).toBe(STATUS_CODE_201)
    expect(status).toBe("success")
    expect(data).toMatchObject(orderData)

  })





})

import { PaymentAttributes } from "../../../core/domain/models/payment/Payment";
import { sequelize } from "../../../core/infra/persistence/postgres/postgresInit";

import request from 'supertest';
import { CustomerAttributes } from "../../../core/domain/models/customer/Customer";
import { url } from "../../../utils/configUtils";
import { STATUS_CODE_201, SUCCMSG } from "../../../utils/controllerUtils";
import { SuperTestResponse, token } from "../../../utils/testUtils";
import { createProductTest, productData } from "../product/product.spec";
import { ProductAttributes } from "../../../core/domain/models/products/Product";
import { orderData, orderTest } from "../order/order.spec";







const paymentData: PaymentAttributes = {
  status: "pending",
  id: 1,
  method: "stripe",
  amount: 40,
  orderId: 1
}





const customerData: CustomerAttributes = { email: "jewelrana@gmail.com", password: "1253", name: "raihan" }





beforeAll(async () => {
  await sequelize.destroyAll()
})


export const paymentTest = async ({ amount, orderId, status, id, method }: PaymentAttributes, token: string) => {

  return await request(url).post('/api/v1/payment/add').send().set('Authorization', `bearer ${token}`) as SuperTestResponse
}



describe("Payment ", () => {


  let orderId = 0


  test("should create a product", async () => {

    const { body: { status, msg, data }, statusCode } = await createProductTest(productData, token)


    expect(msg).toBe(SUCCMSG)
    expect(status).toBe("success")
    expect(data).toMatchObject(productData)
    expect(statusCode).toBe(STATUS_CODE_201)
  })


  test("Should make an order", async () => {

    const { body: { status, msg, data }, statusCode } = await orderTest(orderData)
    expect(msg).toBe("Order created successfully")
    expect(statusCode).toBe(STATUS_CODE_201)
    expect(status).toBe("success")
    expect(data).toMatchObject(orderData)
    paymentData.orderId = data.orderId

    console.log("order id ", data.orderId)
  })
  test("Should make the payment", async () => {

    const { body: { msg, status, data }, statusCode } = await paymentTest(paymentData, token)

    expect(msg).toBe("Payment is made")
    expect(status).toBe("success")
    expect(data).toMatchObject(paymentData)
    expect(statusCode).toBe(201)

  })

})


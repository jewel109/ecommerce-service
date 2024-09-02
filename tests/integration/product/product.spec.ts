import request from 'supertest'
import { url } from '../../../utils/configUtils'
import { ProductAttributes } from '../../../core/domain/models/products/Product'
import { STATUS_CODE_201, SUCCMSG } from '../../../utils/controllerUtils'
import { loginCustomer, registerCustomer } from '../auth/auth.spec'
import { CustomerAttributes } from '../../../core/domain/models/customer/Customer'
import { sequelize } from '../../../core/infra/persistence/postgres/postgresInit'
import { SuperTestResponse } from '../../../utils/testUtils'

const productData: ProductAttributes = {
  name: 'light',
  catagory: 'electronics',
  description: "light will pull out dark",
  price: 20,
  stock: 3
}
const customerData: CustomerAttributes = { email: "jewelrana@gmail.com", password: "1253", name: "raihan" }


export const createProductTest = async ({ name, catagory, description, price, stock }: ProductAttributes, token: string) =>
  await request(url).post('/product').send({ name, catagory, description, price, stock }).set('Authorization', `bearer ${token}`) as SuperTestResponse



beforeAll(async () => {
  await sequelize.destroyAll()
})



describe("Handling Authentication", () => {

  test("should register customer", async () => {
    const { body: { msg, status, data }, statusCode } = await registerCustomer(customerData)

    expect(msg).toBe("User created")
    expect(statusCode).toBe(STATUS_CODE_201)
  })

})

describe("Handling POST /product request should success", () => {

  //  after creating a product  this product data will consume by kafka consumer and it will be indexed to Elastic search . A notification will be send to the Seller that he had created a product he can update,delete  the product

  let token = ''

  beforeAll(async () => {
    const { body: { msg, status, data }, statusCode } = await loginCustomer(customerData)

    expect(msg).toBe("Token created successfully")
    expect(data).toHaveProperty("token")
    token = data.token
    console.log(token)

  })





  test("should contain success status", async () => {

    const { body: { status, msg, data }, statusCode } = await createProductTest(productData, token)


    expect(msg).toBe(SUCCMSG)
    expect(status).toBe("success")
  })



  test("Elastic search should have indexed this product data and it will be searchable", async () => {



  })

})

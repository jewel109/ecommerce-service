import request from 'supertest'
import { CustomerAttributes } from '../../../core/domain/models/customer/Customer'
import { ProductAttributes } from '../../../core/domain/models/products/Product'
import { url } from '../../../utils/configUtils'
import { SUCCMSG } from '../../../utils/controllerUtils'
import { SuperTestResponse, token } from '../../../utils/testUtils'

export const productData: ProductAttributes = {
  name: 'light',
  catagory: 'electronics',
  description: "light will pull out dark",
  price: 20,
  stock: 3
}
const customerData: CustomerAttributes = { email: "jewelrana@gmail.com", password: "1253", name: "raihan" }


export const createProductTest = async ({ name, catagory, description, price, stock }: ProductAttributes, token: string) =>
  await request(url).post('/api/v1/product/add').send({ name, catagory, description, price, stock }).set('Authorization', `bearer ${token}`) as SuperTestResponse







describe("Product and Authentication Handling", () => {

  // let token = ''
  //
  // beforeAll(async () => {
  //   await resetDb()
  // })
  //
  // describe(" Authentication", () => {
  //
  //   test("should register customer", async () => {
  //     const { body: { msg, status, data }, statusCode } = await registerCustomer(customerData)
  //
  //     expect(msg).toBe("User created")
  //     expect(statusCode).toBe(STATUS_CODE_201)
  //   })
  //
  //   test("should login and retrieve token", async () => {
  //
  //     const { body: { msg, status, data }, statusCode } = await loginCustomer(customerData)
  //
  //     expect(msg).toBe("Token created successfully")
  //     expect(data).toHaveProperty("token")
  //     token = data.token
  //
  //
  //   })
  //
  // })
  //

  describe("Product creation and elasticSearch indexing", () => {

    //  after creating a product  this product data will consume by kafka consumer and it will be indexed to Elastic search . A notification will be send to the Seller that he had created a product he can update,delete  the product






    test("should successfully create a product", async () => {
      const { body: { status, msg, data }, statusCode } = await createProductTest(productData, token) as SuperTestResponse

      expect(msg).toBe(SUCCMSG)
      expect(status).toBe("success")
      expect(data).toMatchObject(productData)
      expect(statusCode).toBe(201)
    })


    test("Elastic search should index this product data", async () => {



    })

  })
})

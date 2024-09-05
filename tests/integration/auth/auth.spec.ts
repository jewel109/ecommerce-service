import request from 'supertest';
import { CustomerAttributes } from "../../../core/domain/models/customer/Customer";
import { sequelize } from "../../../core/infra/persistence/postgres/postgresInit";
import { compareHashPassword, hashPassword } from "../../../utils/authUtils";
import { url } from "../../../utils/configUtils";
import { resetDb, SuperTestResponse } from "../../../utils/testUtils";



// console.log(url)

export const customerData: CustomerAttributes = { email: "jewelrana@gmail.com", password: "1253", name: "raihan" }


export const registerCustomer = async ({ name, email, password }: CustomerAttributes) => await request(url).post('/api/v1/customer/register').send({ name, email, password }) as SuperTestResponse

export const loginCustomer = async ({ name, email, password }: CustomerAttributes,) => await request(url).post('/api/v1/customer/login').send({ name, email, password }) as SuperTestResponse

beforeAll(async () => {
  await sequelize.destroyAll()
})


describe('Password Hashing Functions', () => {
  const password = 'mySecretPassword';

  it('should hash a password', async () => {
    const hashedPassword = await hashPassword(password);

    // Check if the hashed password is not the same as the plain password
    expect(hashedPassword).not.toBe(password);

    // Check if the hashed password is a string
    expect(typeof hashedPassword).toBe('string');
  });

  it('should compare a password with its hash and return true if they match', async () => {
    const hashedPassword = await hashPassword(password);
    const isMatch = await compareHashPassword(password, hashedPassword);

    // console.log(isMatch)
    // Check if the password matches the hash
    expect(isMatch).toBe(true);
  });

  it('should return false if the password does not match the hash', async () => {
    const hashedPassword = await hashPassword(password);
    const isMatch = await compareHashPassword('wrongPassword', hashedPassword);

    // Check if the password does not match the hash
    expect(isMatch).toBe(false);
  });
});

describe("testing postgress connection", () => {

  test("should connect to  postgress", async () => {

  })
})

afterAll(async () => {
  console.log("Db closed")
})


describe("Register a customer account", () => {

  beforeAll(async () => {
    await resetDb()
  })

  test("should contain success status", async () => {

    const response = await registerCustomer(customerData)   // console.log(response.body)

    expect(response.body.msg).toBe("Customer created")
    expect(response.body.status).toBe("success")
    expect(response.statusCode).toBe(201)
  })
  test("should contain error status", async () => {

    const response = await request(url).post('/register').send({ name: "jewel", email: "jewel@gmail.com", password: "1234" })
    // console.log(response.body)
    expect(response.body.status).toBe("error")
  })

})

describe("Login a customer", () => {
  let authToken = ""

  beforeAll(async () => {
    const response = await loginCustomer(customerData)
    authToken = response.body.data.token;
    // console.log(authToken)
    // console.log(response.body.data.token)
    expect(response.body.status).toBe("success")
    expect(response.body.data.token).not.toBe(null)
  });


  test("Should contain success status", async () => {
    const response = await request(url).post('/api/v1/customer/login').send(customerData)

    // console.log(response.body)

    expect(response.body.msg).toBe("Token created successfully")
    expect(response.body.status).toBe("success")
    expect(response.body.data.token).not.toBe(null)


  })

  test("Should contain status error", async () => {
    const response = await request(url).post('/api/v1/customer/login').send({ email: "jewel@gmail.com", password: "12345" })

    // console.log(response.body)

    expect(response.body.status).toBe("error")
    expect(response.body.data).toBe(null)


  })

  test("POST /auth Should have success status ", async () => {
    // console.log("authToken ", authToken)

    const response = await request(url).post('/api/v1/customer/auth').set('Authorization', `Bearer ${authToken}`)
    // console.log(response.body)
    expect(response.body.status).toBe("success")
    expect(response.body.data).not.toBe(null)
    expect(response.body.msg).toBe("You have auth data ")
    expect(response.statusCode).toBe(200)
  })
  test("POST /auth Should have error status  if token is not valid", async () => {
    // console.log("authToken ", authToken)

    authToken = "sfawerq'wef"

    const response = await request(url).post('/api/v1/customer/auth').set('Authorization', `Bearer ${authToken}`)
    // console.log(response.body)
    expect(response.body.status).toBe("error")
    expect(response.body.data).toBe(null)
    expect(response.body.msg).toBe("jwt malformed")
    expect(response.statusCode).toBe(500)
  })

})



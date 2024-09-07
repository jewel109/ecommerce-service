import Order from "../core/domain/models/order/Order";
import { sequelize } from "../core/infra/persistence/postgres/postgresInit"
import { customerData, loginCustomer, registerCustomer } from "../tests/integration/auth/auth.spec"
import { orderData, orderTest } from "../tests/integration/order/order.spec";
import { paymentData } from "../tests/integration/payment/payment.spec";
import { STATUS_CODE_201 } from "./controllerUtils"
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});



export interface SuperTestResponse {
  body: {
    msg: string,
    status: "success" | "error"
    data?: any
  },
  statusCode: number
}

export const resetDb = async () => {
  await sequelize.destroyAll()

}

export const resetOrderDb = async () => await Order.destroy({ where: {} })
export let token = '';
export let orderId = 0

beforeAll(async () => {
  await resetDb();
  const registerResponse = await registerCustomer(customerData) as SuperTestResponse;
  expect(registerResponse.body.msg).toBe("Customer created");
  expect(registerResponse.statusCode).toBe(STATUS_CODE_201);

  const loginResponse = await loginCustomer(customerData) as SuperTestResponse;
  expect(loginResponse.body.msg).toBe("Token created successfully");
  expect(loginResponse.body.data).toHaveProperty("token");

  token = loginResponse.body.data.token;
});

beforeAll(async () => {
  await resetOrderDb()
  const { body: { status, msg, data }, statusCode } = await orderTest(orderData, token)
  // console.log(statusCode)
  // console.log(data)
  expect(msg).toBe("Order created successfully")
  expect(statusCode).toBe(STATUS_CODE_201)
  expect(status).toBe("success")
  expect(data).toMatchObject(orderData)
  orderId = data.id
})




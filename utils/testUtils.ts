import { sequelize } from "../core/infra/persistence/postgres/postgresInit"
import { customerData, loginCustomer, registerCustomer } from "../tests/integration/auth/auth.spec"
import { STATUS_CODE_201 } from "./controllerUtils"


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
export let token = '';

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





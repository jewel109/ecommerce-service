import { compareHashPassword, hashPassword } from "../../../utils/authUtils";
import { createDefaultResponse, RepositoryResponse } from "../../../utils/controllerUtils";
import Customer, { CustomerAttributes } from "../models/customer/Customer";
interface CustomerI {
  id: number;
  name: string;
  email: string;
}
class CustomerRepository {
  async findAll() {
    return Customer.findAll()
  }

  async findById(id: number) {
    return Customer.findByPk(id)
  }

  async create(data: Omit<CustomerAttributes, 'id'>) {
    return Customer.create(data);
  }

  async register(name: string, email: string, password: string): Promise<RepositoryResponse> {
    try {

      const emailExist = await Customer.findOne({
        where: { email: email }
      })

      console.log(emailExist)
      if (emailExist) return createDefaultResponse({ msg: "email already exist ", statusCode: 409, })

      const hashedPassword = await hashPassword(password)
      const data = await Customer.create({ name, email, password: hashedPassword })
      return createDefaultResponse({
        data, statusCode: 201, msg: "User created", status: "success"
      })
    } catch (error) {

      if (error instanceof Error) return createDefaultResponse({ msg: error.message, statusCode: 500 })
      return createDefaultResponse({ msg: "Unexpected error", statusCode: 500 })
    }
  }
  async login(email: string, password: string): Promise<RepositoryResponse> {

    try {

      const customerEmail = await Customer.findOne({
        where: { email: email }
      })

      if (!customerEmail) {
        return createDefaultResponse({ msg: "No customer is found with this email", statusCode: 404 })
      }

      const comparePassword = await compareHashPassword(password, customerEmail.password
      )
      if (comparePassword) {
        return createDefaultResponse({ data: customerEmail, status: "success", statusCode: 200, msg: "You are Logged in" })
      }

      return createDefaultResponse({ msg: "Password is not matched ", statusCode: 401 })
    } catch (e) {
      const err = e as Error
      return createDefaultResponse({ msg: err.message, statusCode: 500 })
    }


  }

}

export default CustomerRepository

import { CustomerAttributes } from "../models/customer/Customer";
import CustomerRepository from "../repositories/customerRepository";

export class CustomerService {
  private readonly customerRepo = new CustomerRepository()

  async createCustomer({ name, email, password }: CustomerAttributes) {
    return this.customerRepo.register(name, email, password)
  }
}

import { CustomerAttributes } from "../../domain/models/customer/Customer";
import { CustomerService } from "../../domain/services/customerService";

export class CreateCustomerCommand {
  private readonly customerService = new CustomerService()


  async execute(customerData: CustomerAttributes) {
    return this.customerService.createCustomer(customerData)
  }
}

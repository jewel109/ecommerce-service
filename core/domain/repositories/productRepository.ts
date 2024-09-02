import { createDefaultResponse, RepositoryResponse, STATUS_CODE_201, SUCCMSG } from "../../../utils/controllerUtils";
import Product, { ProductAttributes } from "../models/products/Product";


export class ProductRepository {

  async findAll() {
    return Product.findAll()
  }

  async create({ name, price, catagory, description, stock }: ProductAttributes): Promise<RepositoryResponse> {

    try {

      const data = await Product.create({ name, price, catagory, description, stock })

      if (!data) {
        return createDefaultResponse({ msg: "Product is not Created" })
      }

      return createDefaultResponse({ status: "success", msg: SUCCMSG, statusCode: STATUS_CODE_201 })

    } catch (error) {
      const e = error as Error
      return createDefaultResponse({ msg: e.message, statusCode: 505 })
    }

  }
}

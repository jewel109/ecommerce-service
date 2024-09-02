import { UserInfo } from "os"
import { ProductAttributes } from "../../../core/domain/models/products/Product"
import { ProductRepository } from "../../../core/domain/repositories/productRepository"
import { sendResponse, withRequest } from "../../../utils/controllerUtils"
import { AuthenticatedRequest, UserI } from "../../../utils/authUtils"

const productService = new ProductRepository()


export const productAddingController = withRequest<AuthenticatedRequest>(async (req, res) => {

  try {

    const { name: customerName, email } = req.user as UserI

    if (!customerName || !email) {
      return sendResponse(res, { msg: "You are not authorized", statusCode: 403 })
    }

    const { name, price, stock, catagory, description } = req.body as ProductAttributes
    if (!name || !price || !stock || !catagory || !description) {
      return sendResponse(res, { msg: "please give all details of the product " })
    }

    const { data, msg, status, statusCode } = await productService.create({ catagory, description, name, price, stock })

    return sendResponse(res, { data, msg, status, statusCode })

  } catch (error) {

    const e = error as Error
    sendResponse(res, { msg: e.message, statusCode: 500 })

  }

})

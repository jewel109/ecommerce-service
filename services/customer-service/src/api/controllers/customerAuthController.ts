import CustomerRepository from "../../core/domain/repositories/customerRepository";
import { AuthenticatedRequest } from "../../utils/authUtils";
import { sendResponse, withRequest } from "../../utils/controllerUtils";


const customerService = new CustomerRepository()

export const createCustomerController = withRequest(async (req, res, next) => {

  try {

    const { name, email, password } = req.body
    if (!name) return sendResponse(res, { statusCode: 404, msg: "please provide a name", status: "error" })

    if (!email) return sendResponse(res, { status: "error", statusCode: 404, msg: "Please provide an email" })
    if (!password) return sendResponse(res, { status: "error", statusCode: 404, msg: "Please provide password" })
    const stringPassword = String(password)

    if (stringPassword.length < 4) return sendResponse(res, { statusCode: 422, msg: "please give at least 4 char in password", status: "error" })

    const { data, status, msg, statusCode } = await customerService.register(name, email, password)
    console.log(data)
    if (data) return sendResponse(res, { statusCode, msg, data, status })
    if (status == "error") return sendResponse(res, { statusCode, msg, status })

  } catch (e) {

    console.log(e)
    return sendResponse(res, { statusCode: 500, msg: "Internal server error ", status: "error" })
  }
})

export const loginCustomerController = withRequest<AuthenticatedRequest>(async (req: AuthenticatedRequest, res, next) => {
  const { email, password } = req.body

  if (!email) return sendResponse(res, { status: "error", statusCode: 404, msg: "Please provide an email" })
  if (!password) return sendResponse(res, { status: "error", statusCode: 404, msg: "Please provide password" })
  const stringPassword = String(password)

  if (stringPassword.length < 4) return sendResponse(res, { statusCode: 422, msg: "please give at least 4 char in password", status: "error" })


  const { data, msg, statusCode, status } = await customerService.login(email, password)

  if (status == "error") {
    return sendResponse(res, { status, msg, statusCode })
  }

  req.user = data
  // sendResponse(res, { status, data, msg, statusCode })
  return next()
})



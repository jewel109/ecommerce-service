import { AuthenticatedRequest } from "../../utils/authUtils";
import { jwtSecret } from "../../utils/configUtils";
import { sendResponse, withRequest } from "../../utils/controllerUtils";
import jwt from "jsonwebtoken"


export const emptyOrUnknownRouteHandler = withRequest(async (req, res) => {
  return sendResponse(res, { statusCode: 404, status: "error", msg: "This Route is not found" })
})

export const tokenSendingController = withRequest(async (req: AuthenticatedRequest, res) => {


  try {

    const { email, name } = req.user ?? {}

    // console.log("user email", email)
    if (!name || !email) {
      return sendResponse(res, { msg: "name or email not found", status: "error", statusCode: 404 })
    }

    const token = jwt.sign({ name, email }, jwtSecret, { expiresIn: "10d" })

    if (!token) return sendResponse(res, { status: "error", statusCode: 404, msg: "Token is not created" })
    return sendResponse(res, {
      status: "success", statusCode: 201, msg: "Token created successfully", data: {
        token
      }
    })
  } catch (error) {


    sendResponse(res, { statusCode: 500, msg: "Server error", status: "error" })
  }
})
interface User {
  name: string;
  email: string;
}

export const getPrivateAccessController = withRequest<AuthenticatedRequest>(async (req, res, next) => {

  try {

    const authorization = req.headers.authorization
    // console.log("authorization is ", authorization)

    if (!authorization) return sendResponse(res, { status: 'error', statusCode: 401, msg: "authorization in header is not found" })

    const token = authorization.split(" ")[1]

    const data = jwt.verify(token, jwtSecret)

    // console.log(data)

    if (!data || typeof data === 'string') return sendResponse(res, { status: 'error', statusCode: 401, msg: "jwt can't verify the token" })


    req.user = data as User
    return next()
  } catch (e) {

    const er = e as Error
    sendResponse(res, { status: "error", statusCode: 500, msg: er.message })
  }
})

export const authDataController = withRequest<AuthenticatedRequest>(async (req, res) => {

  try {
    const { email, name } = req.user ?? {}

    // console.log("user email", email)
    if (!name || !email) {
      return sendResponse(res, { msg: "name or email not found", status: "error", statusCode: 404 })
    }

    return sendResponse(res, { msg: "You have auth data ", statusCode: 200, status: "success", data: { name, email } })

  } catch (error) {

    sendResponse(res, { status: "error", statusCode: 500, msg: "Internal  server error" })
  }

})

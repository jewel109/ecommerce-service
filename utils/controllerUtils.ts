import { NextFunction, Request, Response } from 'express';
export type RepositoryResponse<T = any> = {
  status: "success" | "error";
  msg: string;
  data: T | null;
  statusCode: number;
}
export function createDefaultResponse<T>({
  status = "error",
  msg = "An error occurred", // Default message
  data = null,
  statusCode = 404,          // Default HTTP status code to 404
}: Partial<RepositoryResponse<T>> = {}): RepositoryResponse<T> {
  return {
    status,
    msg,
    data,
    statusCode,
  };
}

interface ResponsePayload {
  statusCode?: number;
  status?: "error" | "success";
  msg: string;
  data?: any;
}

export function sendResponse(res: Response, { statusCode = 404, status = "error", msg, data = null }: ResponsePayload) {
  return res.status(statusCode).json({
    status,
    msg,
    data,
  });
}
export type Handler<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => void | Promise<void | Response>;

export const withRequest = <T extends Request>(handler: Handler<T>) => {

  return (req: T, res: Response, next: NextFunction) => {
    return handler(req, res, next);
  };
};


export const SUCCMSG = "Reqest completed successfully"
export const STATUS_CODE_201 = 201
export const STATUS_CODE_200 = 200
export const SERVER_ERR_MSG = "Internal server Erro"


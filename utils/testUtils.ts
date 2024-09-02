

export interface SuperTestResponse {
  body: {
    msg: string,
    status: "success" | "error"
    data?: any
  },
  statusCode: number
}



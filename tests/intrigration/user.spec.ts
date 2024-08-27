import request from 'supertest'
import dotenv from 'dotenv'
import path from 'path'
import app from '../../api/server'


dotenv.config({
  path: path.resolve(__dirname, "../../config/dev.env")


})

describe("get access to server", () => {


  test("should succes", async () => {
    const response = await request(app).get("/")
    console.log(response.body)
  })
})

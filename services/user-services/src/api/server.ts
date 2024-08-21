import express from "express";
import path from 'path'

import dotenv from "dotenv"

dotenv.config({
  path: path.resolve(__dirname, "../config/dev.env"), debug: true
})
const app = express()

app.use(express.json())

app.get("/good", async (req, res) => {
  res.status(200).json({
    msg: 'good'
  })
})

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`server listening in port ${process.env.PORT}`)
  })

}

export default app

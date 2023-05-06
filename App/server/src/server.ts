import { PrismaClient } from '@prisma/client'
import express from "express"
import dayjs from "dayjs"

const prisma = new PrismaClient()

require('dotenv').config()
const refreshTimePassword = process.env.password

const app = express()
const port = 3309

app.use(express.json())

let finalTime = dayjs().subtract(3, 'hour').add(7, "days")
let now = dayjs().subtract(3, 'hour')

setInterval(() => {
  now = dayjs().subtract(3, 'hour')
  if (now >= finalTime) {
    console.log("Chegou!")
  }
}, 1000)

app.post("/refreshtime", async (req, res) => {
  const reqbody = await req.body

  if (reqbody.password === refreshTimePassword) {
    finalTime = dayjs().subtract(3, 'hour').add(7, "days")
    res.json({
      "message": "Tempo atualizado com sucesso!",
      "newDatetime": finalTime
    })
  } else {
    res.status(404)
    res.json({
      "message": "Bad Request"
    })
  }
})

app.get("/getTime", async (req, res) => {
  res.json({
    "Final Time": finalTime,
    "Actual countdown": now
  })
})

app.listen(port, () => {
  console.log(`Servidor iniciado na porta: ${port}`)
})
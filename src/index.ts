// entry point for application 
// env contains typed environment variables.

import express from "express"
import type { Request, Response } from "express"
import { env } from "./env.js"


const app = express()
app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    success: "true",
    message: "health check",
    data: {}
  })
})

app.listen(env.PORT, () => {
  console.log(`server listening on port ${env.PORT}`)
})
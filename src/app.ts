// express app configuration here
// setup middlewares (json, cors, logger, rateLimiter)
// mount error handler (always last)

import express from "express"
import type { Request, Response, NextFunction } from "express";

const app = express()
app.use(express.json())

// mount routers here 

app.get("/health", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    success: true,
    message: "health check",
    data: {}
  })
})

// error handler middleware 

export default app
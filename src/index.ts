// entry point for application 
// env contains typed environment variables.

import { env } from "./env.js";
import app from "./app.js";

app.listen(env.PORT, () => {
  console.log(`server running on PORT ${env.PORT}`)
})

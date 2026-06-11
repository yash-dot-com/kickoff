### kickoff 
- kickoff is a minimal opinionated starter template for backend 

- build backends quickly using 
  - express 5
  - zod 
  - postgresql (pg)
  - drizzle-orm 
  - typescript

### features

- it has preconfigured 
  - /health check 
  - request logger
  - typescript 
  - dev, build, start commands 
  - drizzle-client 
  - express app 
  - generic zod validator middleware 
  - standardized helper function for error & success response

- has module based file organization
  - everything related to post lives inside single folder. 
  - post.schema.ts
  - post.routes.ts
  - post.controller.ts
  - post.service.ts
  - post.query.ts

### file organization 

- simple file organization with no overhead of understanding complex 20 files template with scattered code. 

- src/
  - index.ts <- starts server (listen, port)
  - app.ts <- creates and configures express app, simply import in index.ts and run.
  - modules/ <- all code related to entities lives here.
  - lib/ <- all shared code, helper, utility functions etc lives here.
  - middlewares/ <- all middlewares lives here. 

### deployment ready 
- pg database : railway 
- backend : railway 
- LOCAL DEPLOYMENT SCRIPT, READ THE NOTE -> 
- npm run dev : tsx watch --env-file .env src/index.ts
- npm run build : tsc 
- npm run start : node --env-file .env dist/index.js
- NOTE : remove the "--env-file .env" its only for local development server 
- railway handles environment variables through its dashboard.

### module based file organization for beginners 
- each module is self contained & handles only on specified responsibility. 
- flow is always : route -> controller -> service -> DB
- easy & predictable.

<br>

```
modules/
  links/
    links.routes.ts     <- defines the routes
    links.controller.ts <- handles req/res, calls service
    links.schema.ts     <- zod schemas for this feature (not to be confused with drizzle schemas)
    links.service.ts    <- business logic, talks to DB
    links.query.ts      <- raw drizzle queries, repository fns 
```

### zod guide 
- zod workflow is simple.
  - define schema 
  - create types from schema
  - create object with type 
  - schemaName.parse(object) or schemaName.safeParse(object)
  - on parse : 
    - parse() returns the same object passed in it.
    - safeParse() returns an object : {success: true, data: {object that you passed in safeParse}} 
  - on failure : 
    - parse() throws ZodError 
    - safeParse() returns an object {success:false, error: type ZodError}} 

### drizzle setup guide
- commands 
  - npm run drizzle:generate : npx drizzle-kit generate
  - npm run drizzle:migrate : npx drizzle-kit migrate
  - npm run drizzle:push : npx drizzle-kit push
- drizzle.config.ts : all the drizzle related config goes here. 
- NOTE : drizzle.config.ts needs to exists in the root of the project. 
- this files tells 
  - where your schema files are defined
  - what dialect your database is (postgresql, mysql, sqlite etc)
  - your database connection string 
- organization pattern 
  - src/
    - db/
    - db.ts <- stores the drizzle client 
      - schema/ <- stores all the schema files for each individual table. 
        - links.ts
        - posts.ts
        - users.ts


<br>
    
```js
import {defineConfig} from "drizzle-kit"
import dotenv from "dotenv"
dotenv.config(
  {path: ".env"}
)

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migration",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
```

<br>

### drizzle-orm guide (coming soon)
- writing queries with drizzle orm
- insert
- delete
- update
- others 

### drizzle-kit guide
- drizzle-kit is a helper kit that helps you to migrate database schemas.
-  npx drizzle-kit migrate : generates SQL migration files from your schema changes
- npx drizzle-kit migrate : apply the generated migrations against your DB 
- npx drizzle-kit push : skips migration, pushes schema directly to DB
- npx drizzle-kit studio : opens a UI to browse your DB in the browser. 
- TIPS 
  - use generate + migrate for production 
  - use push for development 
  - studio for debugging 

### express guide 
- express is web framework built on node.js runtime.
- latest one is hono.js which is faster & properly typed with ts.
- learning expresss makes you capable enough to use any JS web framework, its all same. 
- middlewares guide 
- route order guide
 
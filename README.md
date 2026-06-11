# kickoff

A minimal opinionated production-ready TS+Express starter template for building backends quickly.

<img width="1154" height="516" alt="image" src="https://github.com/user-attachments/assets/d79b420d-5d28-4732-9ad2-caa71f9a8603" />


**Built with:**
- Express 5
- Zod
- PostgreSQL (pg)
- Drizzle ORM
- TypeScript

---

## Features

**Preconfigured:**
- `/health` check route
- Request logger
- TypeScript
- `dev`, `build`, `start` npm scripts
- Drizzle client
- Express app
- Generic Zod validator middleware
- Standardized `successResponse` and `errorResponse` helper functions

**Module based file organization:**
- Everything related to a feature lives inside a single folder
- `post.schema.ts`
- `post.routes.ts`
- `post.controller.ts`
- `post.service.ts`
- `post.query.ts`

---

## File Organization

Simple file organization with no overhead of understanding complex 20-file templates with scattered code.

```
src/
  index.ts       ← starts server (listen, port)
  app.ts         ← creates and configures express app, simply import in index.ts and run
  modules/       ← all code related to entities lives here
  lib/           ← all shared code, helper and utility functions live here
  middlewares/   ← all middlewares live here
```

---

## Deployment

- **Database:** Railway (PostgreSQL)
- **Backend:** Railway

**npm scripts — LOCAL ONLY (read the note below):**

```bash
npm run dev    # tsx watch --env-file .env src/index.ts
npm run build  # tsc
npm run start  # node --env-file .env dist/index.js
```

> **NOTE:** Remove `--env-file .env` from the `start` script before deploying. It is only for local development. Railway handles environment variables through its dashboard.

---

## Module Based File Organization

Each module is self-contained and handles only one specified responsibility.

**Flow is always:** `route → controller → service → DB`

Easy and predictable.

```
modules/
  links/
    links.routes.ts      ← defines the routes
    links.controller.ts  ← handles req/res, calls service
    links.schema.ts      ← zod schemas for this feature (not to be confused with drizzle schemas)
    links.service.ts     ← business logic, talks to DB
    links.query.ts       ← raw drizzle queries, repository functions
```

---

## Getting DATABASE_URL from Railway

There are 2 types of database URLs that Railway provides:

- **Public URL** — can be used to access the DB from anywhere, uses TCP proxy
  ```
  postgresql://postgres:password@region.railway.app:port/railway
  ```
- **Private URL** — only accessible from services within the same Railway project via internal networking, uses `railway.internal` hostname

**Environment variable:**
```
DATABASE_URL=postgresql://postgres:password@region.railway.app:port/railway
```

When deploying to Railway, configure the `DATABASE_URL` environment variable separately in the Railway dashboard.

[PostgreSQL + Drizzle docs](https://orm.drizzle.team/docs/tutorials/node-railway-pg)

---

## Zod Guide

Zod workflow is simple:

1. Define schema
2. Create types from schema
3. Create object with type
4. Call `schemaName.parse(object)` or `schemaName.safeParse(object)`

**On success:**
- `parse()` returns the same object passed into it
- `safeParse()` returns `{ success: true, data: { ...object } }`

**On failure:**
- `parse()` throws a `ZodError`
- `safeParse()` returns `{ success: false, error: ZodError }`

---

## Drizzle Setup Guide

**npm scripts:**
```bash
npm run drizzle:generate  # npx drizzle-kit generate
npm run drizzle:migrate   # npx drizzle-kit migrate
npm run drizzle:push      # npx drizzle-kit push
```

**`drizzle.config.ts`** — all Drizzle related config goes here.

> **NOTE:** `drizzle.config.ts` must exist in the root of the project.

This file tells Drizzle:
- Where your schema files are defined
- What dialect your database is (postgresql, mysql, sqlite, etc.)
- Your database connection string

**Organization pattern:**
```
src/
  db/
    db.ts        ← stores the drizzle client
    schema/      ← stores all schema files for each individual table
      links.ts
      posts.ts
      users.ts
```

**Example `drizzle.config.ts`:**
```js
import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migration",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
```

---

## Drizzle ORM Guide *(coming soon)*

- Writing queries with Drizzle ORM
- Insert
- Delete
- Update
- Others

---

## Drizzle Kit Guide

Drizzle Kit is a helper that manages database schema migrations.

| Command | Description |
|---|---|
| `npx drizzle-kit generate` | Generates SQL migration files from your schema changes |
| `npx drizzle-kit migrate` | Applies the generated migrations against your DB |
| `npx drizzle-kit push` | Skips migration files, pushes schema directly to DB |
| `npx drizzle-kit studio` | Opens a UI to browse your DB in the browser |

**Tips:**
- Use `generate` + `migrate` for production
- Use `push` for development
- Use `studio` for debugging

---

## Express Guide

Express is a web framework built on the Node.js runtime. The latest alternative is Hono.js, which is faster and properly typed with TypeScript. Learning Express makes you capable enough to use any JS web framework — they're all the same concepts.

- Middlewares guide *(coming soon)*
- Route order guide *(coming soon)*

---

## Progress

- [x] First commit — installed packages, setup folder structure, configured Drizzle, configured npm scripts, configured typed environment variables, structured db folder
- [ ] Second commit — add Zod validator middleware, error handling middleware, standard response and request helper, request logger, add cookie-parser, implement express-rate-limiter
- [ ] Third commit — restructure `index.ts` and `app.ts`, setup example routes, deploy to Railway

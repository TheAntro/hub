import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

type Bindings = {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

let auth: ReturnType<typeof betterAuth> | null = null;

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  if (!auth) {
    const db = drizzle(c.env.DB, { schema });
    const options: BetterAuthOptions = {
      database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: schema,
      }),
      baseURL: c.env.BETTER_AUTH_URL,
      secret: c.env.BETTER_AUTH_SECRET,
      emailAndPassword: { enabled: true },
      trustedOrigins: ["http://localhost:4321"],
      advanced: {
        disableOriginCheck: true,
      },
    };
    auth = betterAuth(options);
  }
  return auth!.handler(c.req.raw);
});

app.use(
  "*",
  cors({
    origin: (origin) => origin,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  }),
);

const routes = app.get("/", (c) => {
  return c.json({ data: "Hello from Hono!" });
});

export type AppType = typeof routes;
export default app;

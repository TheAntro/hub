import { hc } from "hono/client";
import type { AppType } from "@antro/hub-hono";

const BASE_URL = import.meta.env.API_URL || "http://localhost:8787";

export const client = hc<AppType>(BASE_URL);

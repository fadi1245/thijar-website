import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "ybr0vwvx",
  dataset: "production",
  apiVersion: "2026-09-29",
  useCdn: true,
});
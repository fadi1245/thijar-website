import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: import.meta.env.CONFIG_SANITY_PROJECT_ID,
  dataset: import.meta.env.CONFIG_SANITY_DATASET || "production",
  apiVersion: "2026-09-29",
  useCdn: true,
});
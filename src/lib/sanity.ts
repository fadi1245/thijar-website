import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "3qhw3h6d",
  dataset: "production",
  apiVersion: "2026-09-29",
  useCdn: true,
});
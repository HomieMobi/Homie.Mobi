import { createClient } from "@sanity/client";

export default createClient({
  projectId: "bbk78kug",
  dataset: "production",
  useCdn: true,
});

import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  // Sirve dist/ imitando a Netlify (rutas limpias, 404.html, _redirects, _headers). Requiere `npm run build` previo.
  webServer: {
    command: "node scripts/serve-dist.mjs",
    port: PORT,
    env: { PORT: String(PORT) },
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});

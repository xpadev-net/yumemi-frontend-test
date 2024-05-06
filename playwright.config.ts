import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./src/__tests__",
  use: {
    baseURL: "http://localhost:4173/",
  },
  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
  webServer: {
    command: "npm run build&&npm run preview",
    url: "http://localhost:4173/",
    reuseExistingServer: !process.env.CI,
  },
};

export default config;

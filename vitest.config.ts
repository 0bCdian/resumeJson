import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["html",["json",{outputFile:"html/report.json"}]],
  },
})

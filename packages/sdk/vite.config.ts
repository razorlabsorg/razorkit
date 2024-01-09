import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: "es2020",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "razorWalletSdk",
      fileName: "index",
    },
    sourcemap: false,
    minify: true,
    rollupOptions: {},
  },
  esbuild: {
    target: "es2020",
    pure: mode === "production" ? ["console.log", "debugger"] : [],
  },
  plugins: [
    dts(),
    visualizer({
      open: false, // This opens the visualization in your browser after the build
      filename: "bundle-analysis.html", // The output file for the report
    }),
  ],
}));

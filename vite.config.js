import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let outDir = "build"; // Default output directory

  // Customize output directory based on the mode
  if (mode === "development") {
    outDir = "dist";
  } else if (mode === "uat") {
    outDir = "dist";
  } else if (mode === "production") {
    outDir = "dist";
  }

  return {
    plugins: [react()],

    // Server Configuration
    server: {
      watch: {
        awaitWriteFinish: true, // Avoids writing partial files
      },
      port: 3000,
      host: true, // Allows external access for testing on multiple devices
    },

    // Module Resolution
    resolve: {
      alias: {
        "@": "/src", // Cleaner alias definition
      },
    },

    // CSS Preprocessor Configuration
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // SCSS modern compiler API
        },
      },
    },

    // Build Configuration
    build: {
      outDir: outDir, // Output directory based on mode
      chunkSizeWarningLimit: 1600, // Custom chunk size limit warning
      sourcemap: mode !== "production", // Enable sourcemaps only for non-prod builds
    },
  };
});

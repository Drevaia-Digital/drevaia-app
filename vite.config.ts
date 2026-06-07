import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  base: '/',

  plugins: [
    react(),
    sentryVitePlugin({
      org: "drevaia-digital",
      project: "drevaia-app",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['lucide-react'],
          'supabase': ['@supabase/supabase-js'],
          'seo': ['react-helmet-async'],
        },
      },
    },
    
    chunkSizeWarningLimit: 500,
  },
});
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'https://neo-blog-backend.vercel.app/api/schema/',
  output: './types',
  services: false,
  types: {
    enums: false,
  },
});
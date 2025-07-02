import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: process.env.PORT || 3000,
  },
});


// import { defineConfig } from 'astro/config';
// import tailwind from '@astrojs/tailwind';
// import react from '@astrojs/react';
// import node from '@astrojs/node';

// export default defineConfig({
//   output: 'server',
//   adapter: node({ mode: 'standalone' }),
//   integrations: [tailwind(), react()],
// });

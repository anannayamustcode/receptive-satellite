import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind(), react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
});



// import { defineConfig } from 'astro/config';
// import node from '@astrojs/node';

// export default defineConfig({
//   output: 'server',
//   adapter: node({
//   mode: 'standalone',
//   }),
//   server: {
//     host: '0.0.0.0',
//     port: process.env.PORT || 3000,
//   },
// });


// // import { defineConfig } from 'astro/config';
// // import tailwind from '@astrojs/tailwind';
// // import react from '@astrojs/react';
// // import node from '@astrojs/node';

// // export default defineConfig({
// //   output: 'server',
// //   adapter: node({ mode: 'standalone' }),
// //   integrations: [tailwind(), react()],
// // });

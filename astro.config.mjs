import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), react()],
});

// // @ts-check
// import { defineConfig } from 'astro/config';
// import tailwind from '@astrojs/tailwind';
// import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';


// // import tailwindcss from '@tailwindcss/vite';

// // https://astro.build/config
// export default defineConfig({
//   integrations: [react(), tailwind()],

//   vite: {
//     plugins: [tailwindcss()]
//   }
// });
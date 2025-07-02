import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const rows = await db.all(`
    SELECT DATE(timestamp) AS day, COUNT(*) AS count
    FROM security_events
    GROUP BY day
    ORDER BY day ASC
  `);
  await db.close();

  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// import db from '../../lib/db';

// export async function GET() {
//   const rows = await db.all(`
//     SELECT DATE(timestamp) AS day, COUNT(*) AS count
//     FROM security_events
//     GROUP BY day
//     ORDER BY day ASC
//   `);
//   return new Response(JSON.stringify(rows));
// }

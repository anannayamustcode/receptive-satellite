import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const rows = await db.all(`
    SELECT severity, COUNT(*) AS count
    FROM security_events
    GROUP BY severity
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
//     SELECT severity, COUNT(*) AS count
//     FROM security_events
//     GROUP BY severity
//   `);
//   return new Response(JSON.stringify(rows));
// }

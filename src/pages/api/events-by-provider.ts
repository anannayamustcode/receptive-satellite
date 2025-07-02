// import db from '../../lib/db';

// export async function GET() {
//   const rows = await db.all(`
//     SELECT ca.provider, COUNT(se.id) AS total
//     FROM security_events se
//     JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
//     GROUP BY ca.provider
//   `);
//   return new Response(JSON.stringify(rows));
// }
import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const rows = await db.all(`
    SELECT ca.provider, COUNT(se.id) AS total
    FROM security_events se
    JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
    GROUP BY ca.provider
  `);
  await db.close();

  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

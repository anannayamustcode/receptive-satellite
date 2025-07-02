import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const rows = await db.all(`
    SELECT u.name, ca.provider, se.event_type, se.severity, se.timestamp
    FROM security_events se
    JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
    JOIN users u ON ca.user_id = u.id
    ORDER BY se.timestamp DESC
    LIMIT 10
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
//     SELECT u.name, ca.provider, se.event_type, se.severity, se.timestamp
//     FROM security_events se
//     JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
//     JOIN users u ON ca.user_id = u.id
//     ORDER BY se.timestamp DESC
//     LIMIT 10
//   `);
//   return new Response(JSON.stringify(rows));
// }

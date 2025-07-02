// src/pages/api/events.ts
import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const events = await db.all(`
    SELECT ca.provider, se.event_type, COUNT(*) AS event_count
    FROM security_events se
    JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
    GROUP BY ca.provider, se.event_type
  `);
  await db.close();

  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

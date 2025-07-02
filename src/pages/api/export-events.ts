import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();

  const events = await db.all(`
    SELECT se.id, se.event_type, se.severity, se.timestamp,
           ca.account_name, ca.provider
    FROM security_events se
    JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
    ORDER BY se.timestamp DESC
  `);

  await db.close();

  const headers = ["ID", "Type", "Severity", "Timestamp", "Account", "Provider"];
  const csv = [
    headers.join(","),
    ...events.map(event =>
      [
        event.id,
        event.event_type,
        event.severity,
        event.timestamp,
        event.account_name,
        event.provider
      ]
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=events.csv"
    }
  });
};

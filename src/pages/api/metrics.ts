import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const GET: APIRoute = async () => {
  const db = await openDB();

  const totalEvents = await db.get(`SELECT COUNT(*) AS count FROM security_events`);
  const highSeverity = await db.get(`SELECT COUNT(*) AS count FROM security_events WHERE severity = 'high'`);
  const commonEvent = await db.get(`
    SELECT event_type
    FROM security_events
    GROUP BY event_type
    ORDER BY COUNT(*) DESC
    LIMIT 1
  `);
  const totalAccounts = await db.get(`SELECT COUNT(*) AS count FROM cloud_accounts`);
  const noEventAccounts = await db.get(`
    SELECT COUNT(*) AS count
    FROM cloud_accounts ca
    LEFT JOIN security_events se ON ca.id = se.cloud_account_id
    WHERE se.id IS NULL
  `);
  const totalUsers = await db.get(`SELECT COUNT(*) AS count FROM users`);

  await db.close();

  return new Response(
    JSON.stringify({
      totalEvents: totalEvents.count,
      highSeverity: highSeverity.count,
      commonEvent: commonEvent?.event_type || "N/A",
      totalAccounts: totalAccounts.count,
      noEventAccounts: noEventAccounts.count,
      totalUsers: totalUsers.count,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

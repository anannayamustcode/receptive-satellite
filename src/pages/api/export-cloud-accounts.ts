import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();

  const accounts = await db.all(`
    SELECT ca.id, ca.provider, ca.account_name, u.name AS user_name
    FROM cloud_accounts ca
    JOIN users u ON ca.user_id = u.id
  `);

  await db.close();

  const headers = ["ID", "Provider", "Account Name", "User"];
  const csv = [
    headers.join(","),
    ...accounts.map(acc =>
      [
        acc.id,
        acc.provider,
        acc.account_name,
        acc.user_name
      ]
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=cloud_accounts.csv"
    }
  });
};

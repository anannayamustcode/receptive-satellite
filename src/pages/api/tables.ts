import { openDB } from "../../lib/db";

export async function get() {
  const db = await openDB();
  const result = await db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`);
  await db.close();

  const tables = result.map((row: any) => row.name);
  return new Response(JSON.stringify(tables), {
    headers: { "Content-Type": "application/json" }
  });
}

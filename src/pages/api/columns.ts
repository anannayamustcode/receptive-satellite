import { openDB } from "../../lib/db";

export async function get({ url }: { url: URL }) {
  const table = url.searchParams.get("table");

  if (!table) {
    return new Response(JSON.stringify({ error: "Missing table param" }), { status: 400 });
  }

  const db = await openDB();
  const result = await db.all(`PRAGMA table_info(${table})`);
  await db.close();

  const columns = result.map((row: any) => row.name);
  return new Response(JSON.stringify(columns), {
    headers: { "Content-Type": "application/json" }
  });
}

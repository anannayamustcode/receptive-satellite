// src/pages/api/add-event.ts
import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const event_type = formData.get("event_type")?.toString();
  const severity = formData.get("severity")?.toString();
  const timestamp = formData.get("timestamp")?.toString();
  const cloud_account_id = formData.get("cloud_account_id")?.toString();

  if (!event_type || !severity || !timestamp || !cloud_account_id) {
    return new Response("Missing required fields", { status: 400 });
  }

  const db = await openDB();
  await db.run(
    `INSERT INTO security_events (event_type, severity, timestamp, cloud_account_id)
     VALUES (?, ?, ?, ?)`,
    event_type,
    severity,
    timestamp,
    Number(cloud_account_id)
  );
  await db.close();

  return redirect("/events");
};

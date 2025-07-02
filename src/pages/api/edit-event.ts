// src/pages/api/update-event.ts
import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const event_type = formData.get("event_type")?.toString();
  const severity = formData.get("severity")?.toString();
  const cloud_account_id = formData.get("cloud_account_id")?.toString();

  if (!id || !event_type || !severity || !cloud_account_id) {
    return new Response("Invalid input", { status: 400 });
  }

  const db = await openDB();
  await db.run(
    `UPDATE security_events 
     SET event_type = ?, severity = ?, cloud_account_id = ? 
     WHERE id = ?`,
    event_type,
    severity,
    cloud_account_id,
    id
  );
  await db.close();

  return redirect("/events");
};

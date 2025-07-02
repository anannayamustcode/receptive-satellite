// src/pages/api/delete-event.ts
import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get('id')?.toString();

  if (!id) {
    return new Response('Event ID missing', { status: 400 });
  }

  const db = await openDB();
  await db.run(`DELETE FROM security_events WHERE id = ?`, id);
  await db.close();

  return redirect('/events');
};

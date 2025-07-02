// src/pages/api/delete-user.ts
import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get('id')?.toString();

  if (!id) {
    return new Response('User ID missing', { status: 400 });
  }

  const db = await openDB();
  await db.run(`DELETE FROM users WHERE id = ?`, id);
  await db.close();

  return redirect('/users');
};

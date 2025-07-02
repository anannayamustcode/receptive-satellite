// src/pages/api/update-user.ts
import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  if (!id || !name || !email) {
    return new Response("Invalid input", { status: 400 });
  }

  const db = await openDB();
  await db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    name,
    email,
    id
  );
  await db.close();

  return redirect("/users");
};

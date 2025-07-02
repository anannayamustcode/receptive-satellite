// src/pages/api/add-user.ts
import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  if (!name || !email) {
    return new Response("Invalid input", { status: 400 });
  }

  const db = await openDB();
  await db.run("INSERT INTO users (name, email) VALUES (?, ?)", name, email);
  await db.close();

  return redirect("/"); // Redirect after success
};

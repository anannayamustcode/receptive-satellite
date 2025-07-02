import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = parseInt(formData.get("id")?.toString() || "", 10);

  if (isNaN(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const db = await openDB();
  await db.run("DELETE FROM cloud_accounts WHERE id = ?", id);
  await db.close();

  return redirect("/cloud-accounts");
};

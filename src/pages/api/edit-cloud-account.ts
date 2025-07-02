import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = parseInt(formData.get("id")?.toString() || "", 10);
  const provider = formData.get("provider")?.toString();
  const accountName = formData.get("account_name")?.toString();
  const userId = parseInt(formData.get("user_id")?.toString() || "", 10);

  if (!provider || !accountName || isNaN(userId) || isNaN(id)) {
    return new Response("Invalid input", { status: 400 });
  }

  const db = await openDB();
  await db.run(
    "UPDATE cloud_accounts SET provider = ?, account_name = ?, user_id = ? WHERE id = ?",
    provider,
    accountName,
    userId,
    id
  );
  await db.close();

  return redirect("/cloud-accounts");
};

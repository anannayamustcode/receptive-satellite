import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const provider = formData.get("provider")?.toString();
  const accountName = formData.get("account_name")?.toString();
  const userId = parseInt(formData.get("user_id")?.toString() || "", 10);

  if (!provider || !accountName || isNaN(userId)) {
    return new Response("Invalid input", { status: 400 });
  }

  const db = await openDB();
  await db.run(
    "INSERT INTO cloud_accounts (provider, account_name, user_id) VALUES (?, ?, ?)",
    provider,
    accountName,
    userId
  );
  await db.close();

  return redirect("/cloud-accounts");
};

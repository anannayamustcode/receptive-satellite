// src/pages/api/export-users.ts
import type { APIRoute } from 'astro';
import { openDB } from '../../lib/db';

export const GET: APIRoute = async () => {
  const db = await openDB();
  const users = await db.all(`SELECT id, name, email FROM users`);
  await db.close();

  const headers = ["ID", "Name", "Email"];
  const csv = [
    headers.join(","),
    ...users.map(user =>
      [user.id, user.name, user.email]
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=users.csv"
    }
  });
};

// import { openDB } from "../../lib/db";

// export async function get() {
//   const db = await openDB();
//   const users = await db.all(`SELECT id, name, email FROM users`);
//   await db.close();

//   const headers = ["ID", "Name", "Email"];
//   const csv = [
//     headers.join(","),
//     ...users.map(user =>
//       [user.id, user.name, user.email]
//         .map(val => `"${String(val).replace(/"/g, '""')}"`)
//         .join(",")
//     )
//   ].join("\n");

//   return new Response(csv, {
//     headers: {
//       "Content-Type": "text/csv",
//       "Content-Disposition": `attachment; filename="users.csv"`
//     }
//   });
// }
// // import { openDB } from "../../lib/db";

// // export async function get() {
// //   const db = await openDB();
// //   const users = await db.all(`SELECT id, name, email FROM users`);
// //   await db.close();

// //   const headers = ["ID", "Name", "Email"];
// //   const csv = [
// //     headers.join(","),
// //     ...users.map(user =>
// //       [user.id, user.name, user.email]
// //         .map(val => `"${String(val).replace(/"/g, '""')}"`)
// //         .join(",")
// //     )
// //   ].join("\n");

// //   return new Response(csv, {
// //     headers: {
// //       "Content-Type": "text/csv",
// //       "Content-Disposition": `attachment; filename="users.csv"`
// //     }
// //   });
// // }

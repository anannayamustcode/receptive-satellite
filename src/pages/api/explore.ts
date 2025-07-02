import type { APIRoute } from "astro";
import { openDB } from "../../lib/db";

export const GET: APIRoute = async ({ url }) => {
  const rawSQL = url.searchParams.get("raw_sql");

  const allowedTables: Record<string, string[]> = {
    users: ["id", "name", "email"],
    cloud_accounts: ["id", "provider", "account_name", "user_id"],
    security_events: ["id", "cloud_account_id", "event_type", "severity", "timestamp"]
  };

  try {
    const db = await openDB();

    if (rawSQL) {
      // 🚨 Allow only SELECTs, no dangerous keywords
      if (!/^\s*select\s+/i.test(rawSQL) || /drop|delete|insert|update/i.test(rawSQL)) {
        return new Response(JSON.stringify({ error: "Only safe SELECT statements allowed." }), { status: 400 });
      }
      const rows = await db.all(rawSQL);
      await db.close();
      return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Visual mode fallback
    const table = url.searchParams.get("table");
    const fields = url.searchParams.get("fields")?.split(",") ?? [];
    const limit = parseInt(url.searchParams.get("limit") || "0");
    const orderBy = url.searchParams.get("order_by") ?? "";
    const orderDir = url.searchParams.get("order_dir")?.toUpperCase() ?? "ASC";

    if (!table || !allowedTables[table]) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), { status: 400 });
    }
    if (orderBy && !allowedTables[table].includes(orderBy)) {
      return new Response(JSON.stringify({ error: "Invalid order_by field" }), { status: 400 });
    }
    if (!["ASC", "DESC"].includes(orderDir)) {
      return new Response(JSON.stringify({ error: "Invalid order direction" }), { status: 400 });
    }

    const selectedFields = fields.length
      ? fields.filter(f => allowedTables[table].includes(f))
      : allowedTables[table];

    if (!selectedFields.length) {
      return new Response(JSON.stringify({ error: "No valid fields selected" }), { status: 400 });
    }

    const query = `
      SELECT ${selectedFields.join(", ")}
      FROM ${table}
      ${orderBy ? `ORDER BY ${orderBy} ${orderDir}` : ""}
      ${limit > 0 ? `LIMIT ${limit}` : ""}
    `;
    const rows = await db.all(query);
    await db.close();

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Explore error:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
};


// import type { APIRoute } from "astro";
// import { openDB } from "../../lib/db";

// export const GET: APIRoute = async ({ url }) => {
//   const table = url.searchParams.get("table");
//   const fields = url.searchParams.get("fields")?.split(",") ?? [];
//   const limit = parseInt(url.searchParams.get("limit") || "0");

//   const allowedTables: Record<string, string[]> = {
//     users: ["id", "name", "email"],
//     cloud_accounts: ["id", "provider", "account_name", "user_id"],
//     security_events: ["id", "cloud_account_id", "event_type", "severity", "timestamp"]
//   };

//   if (!table || !allowedTables[table]) {
//     return new Response(JSON.stringify({ error: "Invalid table name" }), { status: 400 });
//   }

//   const selectedFields = fields.length ? fields.filter(f => allowedTables[table].includes(f)) : allowedTables[table];
//   if (!selectedFields.length) {
//     return new Response(JSON.stringify({ error: "No valid fields selected" }), { status: 400 });
//   }

//   try {
//     const db = await openDB();
//     const query = `
//       SELECT ${selectedFields.join(", ")}
//       FROM ${table}
//       ${limit > 0 ? `LIMIT ${limit}` : ""}
//     `;
//     const rows = await db.all(query);
//     await db.close();
//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Explore error:", err);
//     return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
//   }
// };


// // import { openDB } from "../../lib/db";

// // export async function get({ url }: { url: URL }) {
// //   const table = url.searchParams.get("table");
// //   const fields = url.searchParams.get("fields") || "*";
// //   const filter = url.searchParams.get("filter");
// //   const limit = url.searchParams.get("limit") || "10";
// //   const sortBy = url.searchParams.get("sortBy");
// //   const sortDir = url.searchParams.get("sortDir")?.toUpperCase() === "DESC" ? "DESC" : "ASC";

// //   if (!table) {
// //     return new Response(JSON.stringify("Missing table parameter."), { status: 400 });
// //   }

// //   let sql = `SELECT ${fields || "*"} FROM ${table}`;
// //   if (filter) sql += ` WHERE ${filter}`;
// //   if (sortBy) sql += ` ORDER BY ${sortBy} ${sortDir}`;
// //   sql += ` LIMIT ${limit}`;

// //   try {
// //     const db = await openDB();
// //     const rows = await db.all(sql);
// //     const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
// //     await db.close();

// //     return new Response(JSON.stringify({ columns, rows }), {
// //       headers: { "Content-Type": "application/json" }
// //     });
// //   } catch (err) {
// //     return new Response(JSON.stringify((err as Error).message), { status: 400 });
// //   }
// // }

// // // import type { APIRoute } from 'astro';
// // // import { openDB } from '../../lib/db';

// // // export const POST: APIRoute = async ({ request }) => {
// // //   const body = await request.json();

// // //   const {
// // //     table,        // 'users', 'security_events', etc.
// // //     fields,       // ['id', 'name']
// // //     filters,      // [{ field: 'severity', op: '=', value: 'high' }]
// // //     limit,        // 10
// // //     sortField,    // 'id'
// // //     sortOrder     // 'ASC' | 'DESC'
// // //   } = body;

// // //   if (!table || !fields?.length) {
// // //     return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
// // //   }

// // //   const db = await openDB();

// // //   try {
// // //     // Sanitize table and column names against known values only
// // //     const allowedTables = ['users', 'security_events', 'cloud_accounts'];
// // //     if (!allowedTables.includes(table)) throw new Error('Invalid table');

// // //     const allowedColumns = {
// // //       users: ['id', 'name', 'email'],
// // //       cloud_accounts: ['id', 'provider', 'account_name', 'user_id'],
// // //       security_events: ['id', 'cloud_account_id', 'event_type', 'severity', 'timestamp']
// // //     };

// // //     const validFields = fields.filter((f) => allowedColumns[table].includes(f));
// // //     if (validFields.length === 0) throw new Error('No valid fields');

// // //     const whereClauses = [];
// // //     const params: any[] = [];

// // //     for (const filter of filters || []) {
// // //       if (
// // //         allowedColumns[table].includes(filter.field) &&
// // //         ['=', '!=', '>', '<', 'LIKE'].includes(filter.op)
// // //       ) {
// // //         whereClauses.push(`${filter.field} ${filter.op} ?`);
// // //         params.push(filter.value);
// // //       }
// // //     }

// // //     const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

// // //     const orderClause =
// // //       sortField && allowedColumns[table].includes(sortField)
// // //         ? `ORDER BY ${sortField} ${sortOrder === 'DESC' ? 'DESC' : 'ASC'}`
// // //         : '';

// // //     const safeLimit = Math.min(Number(limit) || 10, 100);

// // //     const query = `
// // //       SELECT ${validFields.join(', ')}
// // //       FROM ${table}
// // //       ${where}
// // //       ${orderClause}
// // //       LIMIT ${safeLimit}
// // //     `;

// // //     const results = await db.all(query, params);
// // //     await db.close();

// // //     return new Response(JSON.stringify(results), {
// // //       status: 200,
// // //       headers: { 'Content-Type': 'application/json' }
// // //     });
// // //   } catch (err) {
// // //     console.error('Explore query error:', err);
// // //     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
// // //   }
// // // };


// // // // import type { APIRoute } from "astro";
// // // // import { openDB } from "../../lib/db";

// // // // export const POST: APIRoute = async ({ request }) => {
// // // //   const formData = await request.formData();
// // // //   const table = formData.get("table")?.toString();
// // // //   const fields = formData.get("fields")?.toString() || "*";
// // // //   const filter = formData.get("filter")?.toString()?.trim();
// // // //   const sort = formData.get("sort")?.toString()?.trim();
// // // //   const limit = parseInt(formData.get("limit")?.toString() || "100");

// // // //   const allowedTables = ["users", "cloud_accounts", "security_events"];
// // // //   if (!table || !allowedTables.includes(table)) {
// // // //     return new Response("Invalid table name", { status: 400 });
// // // //   }

// // // //   let query = `SELECT ${fields} FROM ${table}`;
// // // //   if (filter) query += ` WHERE ${filter}`;
// // // //   if (sort) query += ` ORDER BY ${sort}`;
// // // //   if (limit && !isNaN(limit)) query += ` LIMIT ${limit}`;

// // // //   try {
// // // //     const db = await openDB();
// // // //     const results = await db.all(query);
// // // //     await db.close();

// // // //     return new Response(
// // // //       `<pre>${JSON.stringify(results, null, 2)}</pre>`,
// // // //       { status: 200, headers: { "Content-Type": "text/html" } }
// // // //     );
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     return new Response("Query error: " + String(err), { status: 500 });
// // // //   }
// // // // };

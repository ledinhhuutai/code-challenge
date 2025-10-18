import { pool } from "../config/db";

export async function createItem(input: {
  id: string;
  name: string;
  description?: string;
  status?: string;
}) {
  const status = input.status || "active";
  const q =
    "INSERT INTO items (id,name,description,status) VALUES ($1,$2,$3,$4) RETURNING *";
  const r = await pool.query(q, [
    input.id,
    input.name,
    input.description || null,
    status,
  ]);
  return r.rows[0];
}

export async function listItems(filters: {
  q?: string;
  status?: string;
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: string;
}) {
  const where: string[] = [];
  const params: any[] = [];
  let p = 1;
  if (filters.q) {
    where.push(`(lower(name) LIKE $${p} OR lower(description) LIKE $${p})`);
    params.push(`%${filters.q.toLowerCase()}%`);
    p++;
  }
  if (filters.status) {
    where.push(`status = $${p}`);
    params.push(filters.status);
    p++;
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const sortBy = filters.sortBy || "created_at";
  const sortOrder = filters.sortOrder === "asc" ? "asc" : "desc";
  const q = `SELECT * FROM items ${whereSql} ORDER BY ${sortBy} ${sortOrder} LIMIT $${p} OFFSET $${
    p + 1
  }`;
  params.push(filters.limit, filters.offset);
  const r = await pool.query(q, params);
  return r.rows;
}

export async function getItem(id: string) {
  const r = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
  return r.rows[0] || null;
}

export async function updateItem(
  id: string,
  patch: {
    name?: string;
    description?: string;
    status?: string;
  }
) {
  const sets: string[] = [];
  const params: any[] = [];
  let p = 1;
  if (patch.name !== undefined) {
    sets.push(`name=$${p}`);
    params.push(patch.name);
    p++;
  }
  if (patch.description !== undefined) {
    sets.push(`description=$${p}`);
    params.push(patch.description);
    p++;
  }
  if (patch.status !== undefined) {
    sets.push(`status=$${p}`);
    params.push(patch.status);
    p++;
  }
  sets.push(`updated_at=NOW()`);
  const q = `UPDATE items SET ${sets.join(",")} WHERE id=$${p} RETURNING *`;
  params.push(id);
  const r = await pool.query(q, params);
  return r.rows[0] || null;
}

export async function deleteItem(id: string) {
  const r = await pool.query("DELETE FROM items WHERE id=$1", [id]);
  return r.rowCount > 0;
}

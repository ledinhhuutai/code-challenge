import { randomUUID } from "crypto";
import { ItemCreateSchema, ItemUpdateSchema, ListQuerySchema } from "../types/resource";
import { createItem, listItems, getItem, updateItem, deleteItem } from "../repositories/items.repository";

export async function create(input: unknown) {
  const payload = ItemCreateSchema.parse(input);
  const id = randomUUID();
  return await createItem({ id, ...payload });
}

export async function list(query: unknown) {
  const q = ListQuerySchema.parse(query);
  return await listItems({ q: q.q, status: q.status, limit: q.limit, offset: q.offset, sortBy: q.sortBy, sortOrder: q.sortOrder });
}

export async function get(id: string) {
  return await getItem(id);
}

export async function patch(id: string, input: unknown) {
  const payload = ItemUpdateSchema.parse(input);
  return await updateItem(id, payload);
}

export async function remove(id: string) {
  return await deleteItem(id);
}
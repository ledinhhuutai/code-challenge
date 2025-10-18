import { z } from "zod";

export const ItemCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["active","inactive"]).optional()
});

export const ItemUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["active","inactive"]).optional()
});

export const ListQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["active","inactive"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sortBy: z.enum(["name","created_at","updated_at"]).optional(),
  sortOrder: z.enum(["asc","desc"]).optional()
});

export type Item = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};
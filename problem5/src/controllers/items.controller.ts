import { Request, Response } from "express";
import * as svc from "../services/items.service";

export async function create(req: Request, res: Response) {
  const r = await svc.create(req.body);
  res.status(201).json(r);
}

export async function list(req: Request, res: Response) {
  const r = await svc.list(req.query);
  res.json(r);
}

export async function get(req: Request, res: Response) {
  const r = await svc.get(req.params.id);
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(r);
}

export async function patch(req: Request, res: Response) {
  const r = await svc.patch(req.params.id, req.body);
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(r);
}

export async function remove(req: Request, res: Response) {
  const ok = await svc.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
}
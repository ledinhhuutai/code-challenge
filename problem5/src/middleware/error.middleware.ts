import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err && err.name === "ZodError") {
    return res.status(400).json({ message: "Invalid request", details: err.issues });
  }
  return res.status(500).json({ message: "Internal error" });
}
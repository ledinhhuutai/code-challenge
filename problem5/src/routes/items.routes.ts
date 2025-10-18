import { Router } from "express";
import * as ctrl from "../controllers/items.controller";

const r = Router();
r.post("/v1/items", ctrl.create);
r.get("/v1/items", ctrl.list);
r.get("/v1/items/:id", ctrl.get);
r.patch("/v1/items/:id", ctrl.patch);
r.delete("/v1/items/:id", ctrl.remove);

export default r;
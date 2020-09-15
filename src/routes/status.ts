import { Router, RequestHandler } from "express";

const router = Router();

const getStatus:RequestHandler = (req, res, next) => {
  res.send(":o)");
}

router.get("/", getStatus);

export default router;

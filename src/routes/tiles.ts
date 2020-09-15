import { Router, RequestHandler } from "express";
import { tiles } from "../TileService";

const router = Router();

const fetchTile:RequestHandler = (req, res, next) => {
    const z: number = +req.params.z;
    const x: number = +req.params.x;
    const y: number = +req.params.y;
  
    tiles.getTile(z, x, y, function (data: any) {
      res.set(data.headers)
      res.send(data.tile)
    });
  }

router.get("/:z/:x/:y.*", fetchTile);

export default router;

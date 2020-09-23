import express, { Request, Response, NextFunction } from "express";

import path from "path";

import tileRoutes from "./routes/tiles";
import statusRoutes from "./routes/status";

const PORT = 8000;
const SERVER = "0.0.0.0";

const app = express();

app.disable('x-powered-by');
app.use('*', function(req, res, next) {
  // set CORS response header
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  // console.log('Request for: ', req.baseUrl);
  
  next();
});

app.use("/", express.static(path.join(__dirname, 'client')));
app.use("/status", statusRoutes)
app.use("/tiles", tileRoutes);
app.use('/style', express.static(path.join(__dirname, 'style')))  

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: err.message });
});

app.listen(PORT, SERVER, () => {
  console.log("Server listening on: ", PORT);
});
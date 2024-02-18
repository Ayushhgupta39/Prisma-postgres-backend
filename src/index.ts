import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server started on port 8080.");
});

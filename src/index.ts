import express, { Express, Request, Response } from "express";
import { PORT } from "./config/config";
import router from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddlware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app: Express = express();

app.use(express.json())

app.use("/api", router);

app.use(errorMiddlware)

export const prismaClient = new PrismaClient({
  log: ["query"]
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignUpSchema.parse(args.data)
        return query(args )
      }
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

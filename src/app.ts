import bodyParser from "body-parser";
import express, { Express } from "express";
import session from "express-session";
import path from "path";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { categoryRouter } from "./routes/category";
import { productRouter } from "./routes/product";
import { connectToDB } from "./util/database";
import { createDBDefaults } from "./util/db-default-objects";
// TODO: move somewhere else:
declare module "express-session" {
  interface SessionData {
    userId: number;
    isLoggedIn: boolean;
  }
}

connectToDB().then(async (isSuccess) => {
  if (!isSuccess) {
    process.exit(1);
  }

  isSuccess = await createDBDefaults();

  if (!isSuccess) {
    process.exit(1);
  }
});

const app: Express = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.listen(3000, () => {
  console.log("UP AND RUNNING!");
});

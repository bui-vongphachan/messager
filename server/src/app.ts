import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./passport";

const app = express();

app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(cors());

app.options("*", cors());

app.use("/api", Routes);

app.get("/auth/facebook", passport.authenticate("facebook"));

export { app };

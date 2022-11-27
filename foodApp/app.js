const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");

app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/review", reviewRouter);

app.listen(5000);
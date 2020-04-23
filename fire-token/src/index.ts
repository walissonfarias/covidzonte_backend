import * as Express from "express";
import * as Cors from "cors";
//import axios from "axios";
// const cors = require("cors");

//import { checkIfAuthenticated } from "./auth.middleware";

const app = Express();
const port = 3000;
app.use(Cors());

app.get("/", (_, res) => {
  return res.send("Hello World!");
});

app.listen(port,()=> console.log('working on port ', port));
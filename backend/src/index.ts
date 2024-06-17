import express, {Express} from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import {retrieveRouter} from "./retrieveRoute";
import {embedRouter} from "./embedRoute";

const app: Express = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  next();
});

app.use(embedRouter);
app.use(retrieveRouter);

// start server
const port: string | number = process.env.PORT || 4008;
app.listen(port, () => {
  console.log('DocMate backend running...')
})

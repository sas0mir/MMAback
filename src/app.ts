import express, {Request, Response, Express} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import { get as lget } from "lodash";
require("dotenv").config();
require("./auth/passport");

// require("./models/users");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.all('/secret', function(req: Request, res: Response, next: any) {
    //todo
    //req.requestTime = Date.now();
    next()
  });
  
  app.use(bodyParser());
  
  app.set('views', './views');
  app.set('view engine', 'pug');
  
  app.get('/test_template', function(req: Request, res: Response) {
    res.render('testpage', {title: 'Testing', message: 'Template render success'});
  });

app.get('/gg', (req, res) => {
  console.log('GG-SESSION->', lget(req, 'session'));
  res.send('gg');
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
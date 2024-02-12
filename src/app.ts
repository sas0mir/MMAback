import express, {Request, Response, Express} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import { get as lget } from "lodash";
require("dotenv").config();

// declare global {
//   namespace Express {
//     interface Session {
//       _token?: String
//     }
//   }
// }

const middlewares = require("./middlewares");
const api = require("./api");
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'smi-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
  
  app.use(bodyParser());
  
  app.set('views', './src/views');
  app.set('view engine', 'pug');

  app.get('/register_ssrui', function(req: Request, res: Response) {
    res.render('register', {title: 'register', message: 'create account'});
  });

  app.get('/login_ssrui', function(req: Request, res: Response) {
    res.render('login', {title: 'login', message: 'enter'});
  });

  app.get('/dashboard_ssrui', middlewares.requireAuth, function(req: Request, res: Response) {
    console.log('DASHBOARD USER-SESSION->', lget(req, 'session'));
    res.render('dashboard', {title: 'Hello username', message: lget(req, 'session.token') || 'dashboard'});
  });

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.requireAuth);

module.exports = app;
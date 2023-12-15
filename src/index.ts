import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser = require('body-parser');



// var pgp = require("pg-promise")(/*options*/);
// var db = pgp("postgres://username:password@host:port/database");

// db.one("SELECT $1 AS value", 123)
//     .then(function (data) {
//         console.log("DATA:", data.value);
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error);
//     });

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

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

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
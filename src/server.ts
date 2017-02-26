/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import './__2.1.1.workaround.ts'; // temporary until 2.1.1 things are patched in Core
import * as path from 'path';
import * as express from 'express';
import * as shrinkray from 'shrink-ray';
import * as cors from 'cors';
import * as spdy from 'spdy';
import * as fs from 'fs';
import { createEngine } from 'angular2-express-engine';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.node.module';
import { environment } from './environments/environment';
import { routes } from './server.routes';

// App
const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const port = process.env.PORT || 4200;

// Configure the SPDY/HTTP2 options
const spdyOptions = {
  // Private key
  key: fs.readFileSync(path.join(__dirname, '../../keys/server.key')),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync(path.join(__dirname, '../../keys/server.crt')),

  // **optional** SPDY-specific options
  spdy: {
    protocols: ['h2', 'spdy/3.1', 'spdy/3', 'spdy/2', 'http/1.1'],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': false,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: true
    }
  }
};


/**
 * enable prod mode for production environments
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Express View
 */
app.engine('.html', createEngine({}));
app.set('views', path.join(ROOT, 'client'));
app.set('view engine', 'html');

// Disable security leakage of Express info
app.disable('x-powered-by');

/**
 * Enable CORS
 */
app.use(cors());

/**
 * Enable shrinkray
 */
app.use(shrinkray());

/**
 * serve static files
 */
app.use('/', express.static(path.join(ROOT, 'client'), { index: false }));

/**
 * place your api routes here
 */
// app.use('/api', api);

/**
 * bootstrap universal app
 * @param req
 * @param res
 */
function ngApp(req: any, res: any) {
  res.render('index', {
    req,
    res,
    ngModule: AppModule,
    preboot: true,
    async: true,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname
  });
}

/**
 * use universal for specific routes
 */
app.get('/', ngApp);
routes.forEach(route => {
  app.get(`/${route}`, ngApp);
  app.get(`/${route}/*`, ngApp);
});

/**
 * if you want to use universal for all routes, you can use the '*' wildcard
 */

app.get('*', function(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  const pojo = { status: 404, message: 'No Content' };
  const json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

spdy
  .createServer(spdyOptions, app)
  .listen(port, error => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log(`Listening on port ${port}`);
    }
  });

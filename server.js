import {
  Application,
  isHttpError,
  Status,
} from 'https://deno.land/x/oak/mod.ts';

import router from './routes/router.js';

const app = new Application();

// Uncaught exception
app.addEventListener('error', (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          // handle NotFound
          break;
        default:
        // handle other statuses
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});


app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server is listening on 3000');

await app.listen({ port: 3000 });

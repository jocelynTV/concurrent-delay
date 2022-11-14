concurrent-delay
=============

A class that provides a way to delay a task

Installation
------------
  via npm:

      $ npm install concurrent-delay

  via yarn:

      $ yarn add concurrent-delay

Example
----------------
``` js
import { DelayRequest } from 'concurrent-delay';

// Use redis
const cDelay = new DelayRequest({ host: 'localhost', port: 6379 });

// Job delay every 2 seconds takes effect for 60 seconds
app.get('/task', async (req, res) => {
  await cDelay.delay({ ms: 2000, ttl: 60, key: 'abc' });
  res.send(200, 'ok')
});

```

### API options

``` js
new DelayRequest(options)
```
 
Redis store for concurrent-delay, visit [ioredis](https://github.com/luin/ioredis) configuration

``` js
delay(options)
```
 - `ms`: `Number` Number of milliseconds delay
 - `ttl`: `Number` Time of seconds expires
 - `key`: `String` Key can be consumed by IP address, user ID, authorisation token, API route or any other string.
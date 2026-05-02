const express = require('express');
const run = require('./schedule');

const app = express();

app.use((req, res, next) => {
  let d = new Date().toISOString();
  console.log(req.method, req.url, d);
  next();
});

app.get('/schedule', async (req, res) => {
  let ans = await run();
  res.json(ans);
});

app.listen(3000, () => {
  console.log("running on 3000");
});

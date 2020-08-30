const config = require('./config');
const webpackOptions = require('./webpack.config');
const webpack = require('webpack')
const open = require('open');

const compiler = webpack(webpackOptions);
const express = require('express');
const app = express();

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  // webpack-dev-middleware options
  publicPath: webpackOptions.output.publicPath,
  stats: 'errors-warnings'
})

devMiddleware.waitUntilValid(() => {
  const url = `http://${config.HOST}:${config.PORT}`
  console.log('listening at ', url);
  open(url)
})

app.use(devMiddleware);

const hotMiddleware = require("webpack-hot-middleware")(compiler)

app.use(hotMiddleware);

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`))
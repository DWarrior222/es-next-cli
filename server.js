const webpackOptions = require('./webpack.config');
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware');


const compiler = webpack(webpackOptions);
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
    publicPath: webpackOptions.output.publicPath,
    stats: 'errors-warnings'
  })
);

app.use(
  require("webpack-hot-middleware")(compiler)
);


app.listen(8080, () => console.log('Example app listening on port 8080!'))
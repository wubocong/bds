const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080/', "webpack/hot/dev-server");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, config.devServer);
server.listen(8080);
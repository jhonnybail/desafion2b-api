const path = require("path");

module.exports = {
    entry: { 
        "src/server": './src/server.js'
    },
    node: {
        __dirname: true
    },
    output: {
      libraryTarget: "commonjs",
      path: path.join(__dirname, ".webpack"),
      filename: "[name].js"
    },
    optimization: {
        minimize: true
    },
    performance: {
        hints: false
    },
    devtool: 'nosources-source-map',
    externals: [
        'firebase-admin',
        'firebase'
    ],
    target: 'node',
    mode: 'production',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
}
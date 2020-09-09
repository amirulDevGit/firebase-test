const path = require('path');
module.exports = {
      mode: "development",
      entry: "./js-template/index.js",
      output:{
            filename: "dist.js",
            path: path.resolve(__dirname, "assets"),
      }
}
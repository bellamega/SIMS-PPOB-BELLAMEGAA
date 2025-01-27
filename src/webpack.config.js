// webpack.config.js (example)
module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      // ... other rules ...
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // ...
};
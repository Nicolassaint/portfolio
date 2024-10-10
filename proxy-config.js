module.exports = {
    "/api/*": {
      "target": "https://api.olympia.bhub.cloud",
      "changeOrigin": true,
      "pathRewrite": {
        "^/api": ""
      }
    }
  };
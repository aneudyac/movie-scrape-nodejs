const providers = require("../services/providers.js");

module.exports = async ({ url, headers }) => {
  try {
    const provider = providers(url);
    const videoUrl = await provider(url);
    return Promise.resolve(videoUrl);
  } catch (error) {
    return Promise.reject(error);
  }
};

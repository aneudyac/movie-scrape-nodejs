import providers from "../services/providers.js";

export default async ({ url, headers }) => {
  try {
    const provider = providers(url);
    const videoUrl = await provider(url);
    return Promise.resolve(videoUrl);
  } catch (error) {
    return Promise.reject(error);
  }
};

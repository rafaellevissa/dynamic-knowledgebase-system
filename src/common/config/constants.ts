export const application = {
  port: process.env.APP_PORT,
  secret: process.env.APP_SECRET as string,
  baseUrl: process.env.APP_BASE_URL as string,
};

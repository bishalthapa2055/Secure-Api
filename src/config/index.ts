import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    name: process.env.APP_NAME || "Bishal",
    env: process.env.NODE_ENV || "development",
    url: process.env.APP_URL || "http://localhost:8990",
    host: process.env.APP_HOST || "localhost",
    port: process.env.PORT || 9900,
    mongoUri: process.env.MONGO_URI! || "mongodb://localhost:27017/StrongApi",
  },
};

export default config;

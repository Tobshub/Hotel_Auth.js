import mongoose from "mongoose";
import pino from "pino";
const logger = pino();

export default function database() {
  const startdb = async () => {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => {
        logger.info("Connected to database...");
      })
      .catch((error) => {
        logger.error(error);
        logger.error("Error connecting to database...", error);
        logger.info("Reconnecting to database...");
        startdb();
      });
  };

  startdb();
}


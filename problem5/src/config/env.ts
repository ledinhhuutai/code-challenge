import dotenv from "dotenv";
dotenv.config();

export const env = {
  dbUrl: process.env.DB_URL || "",
  port: parseInt(process.env.PORT || "3000", 10)
};
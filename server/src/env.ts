import z from "zod";
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
	ENV: z.enum(["development", "production"]),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	OPENAI_API_KEY: z.string(),
});

// Load environment variables and validate them against the schema
export const config = envSchema.parse(process.env);
export const isProd = config.ENV === "production";

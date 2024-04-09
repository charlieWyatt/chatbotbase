import pino from "pino-http";
import pretty from "pino-pretty";
import cors from "cors";
import logger from "./logger";

import path from "path";
import { User } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express, { Request as ExpressRequest } from "express";
import { decodeToken } from "./auth/jwt";
import { prisma } from "./db";
import { appRouter } from "./router";

const app = express();

app.use(
	pino(
		pretty({
			colorize: true,
			messageFormat: "HTTP {req.method} {req.url} {res.statusCode}",
			hideObject: true,
		})
	)
);
app.use(cors({ credentials: true }));

const getUserFromHeader = async (req: express.Request) => {
	if (req.headers.authorization) {
		const decodedUser = await decodeToken(
			req.headers.authorization.split(" ")[1]
		);
		let user = null;
		if (decodedUser) {
			user = await prisma.user.findFirst({
				where: {
					username: decodedUser.username,
				},
			});
		}
		return user;
	}
	return null;
};

interface AuthRequest extends ExpressRequest {
	ctx: {
		user: User;
	};
}

const authMiddleware = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const user = await getUserFromHeader(req);
		if (!user) {
			return res.status(401).json({
				message: "Auth failed",
			});
		}
		(req as AuthRequest).ctx = { user };
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Auth failed",
		});
	}
};

// TRPC
const createContext = async ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	let user = await getUserFromHeader(req);
	return {
		req,
		user,
	};
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

// Static files
const fullPath = path.join(__dirname, "../../public");
logger.info(`Serving static files from ${fullPath}`);

app.use(express.static(fullPath));

app.get("*", (_, response) => {
	response.sendFile(path.join(fullPath, "index.html"));
});

app.listen(3000, () => {
	logger.info("🤘 Server started on http://localhost:3000");
});

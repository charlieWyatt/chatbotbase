import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from ".";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
	console.log("isAuthed", ctx.user);
	if (!ctx.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}
	return next({
		ctx: {
			req: ctx.req,
			user: ctx.user, // makes it so User can not be null in a authed procedure
		},
	});
});

export const protectedProcedure = t.procedure.use(isAuthed);

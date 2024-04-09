import bcrypt from "bcrypt";

import { z } from "zod";
import { prisma } from "../../db";
import { createToken } from "../../auth/jwt";
import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const userRouter = router({
	getUser: publicProcedure
		.input(z.object({ username: z.string() }))
		.query((req) => {
			return prisma.user.findFirst({
				where: { username: req.input.username },
				select: { username: true, id: true },
			});
		}),
	createUser: publicProcedure
		.input(
			z.object({
				username: z.string().min(3),
				password: z.string().min(8),
				email: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const passwordHash = await bcrypt.hash(input.password, 10);
			const user = await prisma.user.create({
				data: {
					username: input.username,
					email: input.email,
					passwordHash,
				},
			});
			return {
				token: createToken(user),
			};
		}),
});

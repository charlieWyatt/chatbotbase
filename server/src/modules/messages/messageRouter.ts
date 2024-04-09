import { z } from "zod";
import { prisma } from "../../db";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { decodeToken } from "../../auth/jwt"; // Assuming this function can decode JWTs

export const messageRouter = router({
	getMessages: publicProcedure
		.input(z.object({ token: z.string() }))
		.query(async ({ input }) => {
			console.log(input.token);
			const userId = decodeToken(input.token).id; // Decode the token to get userId
			console.log(userId);

			const messages = await prisma.message.findMany({
				where: { senderId: userId },
				select: {
					id: true, // Assuming 'id' exists in your Message model
					text: true,
					createdAt: true,
					senderId: true,
					isSent: true, // Assuming 'isSent' exists in your Message model
					sender: {
						// Assuming you have a relationship defined to fetch sender details
						select: {
							id: true,
							username: true,
						},
					},
				},
			});

			// Transform the data to match the expected format in the frontend
			return messages.map((msg) => ({
				id: msg.id,
				text: msg.text,
				timestamp: msg.createdAt.toISOString(), // Converting Date to ISO string if needed
				sender: {
					id: msg.sender.id,
					username: msg.sender.username,
				},
				isSent: msg.isSent,
			}));
		}),

	sendMessage: publicProcedure
		.input(
			z.object({
				token: z.string(),
				text: z.string().min(1),
			})
		)
		.mutation(async ({ input }) => {
			const userId = decodeToken(input.token).id; // Decode the token to get userId

			console.log(userId);

			const sender = await prisma.user.findUnique({ where: { id: userId } });
			if (!sender) throw new Error("Sender does not exist.");

			const message = await prisma.message.create({
				data: {
					text: input.text,
					senderId: sender.id,
					isSent: true,
				},
			});
			return message;
		}),
});

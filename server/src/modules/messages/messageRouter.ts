import { z } from "zod";
import { prisma } from "../../db";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { decodeToken } from "../../auth/jwt"; // Assuming this function can decode JWTs

export const messageRouter = router({
	getMessages: publicProcedure
		.input(z.object({ token: z.string() }))
		.query(async ({ input }) => {
			const userId = decodeToken(input.token).id; // Decode the token to get userId
			
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
	modelReply: publicProcedure
		.input(
			z.object({
				token: z.string(),
				message: z.string().min(1, "Message must not be empty"),
			})
		)
		.mutation(async ({ input }) => {
			const { token, message } = input;

			const url = "https://api.openai.com/v1/chat/completions";
			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
					body: JSON.stringify({
						model: "gpt-3.5-turbo",
						messages: [{ role: "user", content: message }],
						temperature: 0.7,
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				const gptResponse = data.choices[0].message.content;

				// Send the GPT response as a new message from the system
				const systemMessage = await prisma.message.create({
					data: {
						text: gptResponse,
						senderId: decodeToken(token).id, // Assuming system uses a special sender ID or similar setup
						isSent: false,
					},
				});

				return {
					response: gptResponse,
					systemMessageId: systemMessage.id,
				};
			} catch (error) {
				console.error("Error calling GPT API or saving the message:", error);
				throw new Error("Failed to process the message");
			}
		}),
});

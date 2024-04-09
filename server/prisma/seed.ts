import { PrismaClient } from "@prisma/client";
import { config } from 'dotenv';
config();

const prisma = new PrismaClient();

async function main() {
	// Insert your seed data here
	await prisma.user.create({
		data: {
			id: "0", // This will need to be a unique value that adheres to your id generation strategy (nanoid)
			username: "ai",
			email: "charlie.wyatt0@icloud.com",
			passwordHash: "na",
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

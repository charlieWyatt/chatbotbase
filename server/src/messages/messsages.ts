import express, { request, Request, Response } from "express";
import { Message, User } from "../types";

let DUMMY_MESSAGES: Message[] = [
	{
		id: 1,
		sender: "gpt",
		timestamp: "now",
		text: "Hello, how can I help?",
		isSent: false,
	},
	{
		id: 2,
		sender: "me",
		timestamp: "now",
		text: "please answer quickly!",
		isSent: true,
	},
	{
		id: 3,
		sender: "me",
		timestamp: "now",
		text: "okay?",
		isSent: true,
	},
	{
		id: 4,
		sender: "gpt",
		timestamp: "now",
		text: "okay!",
		isSent: false,
	},
];

const router = express.Router();

router.post("/getMessages", async (req: Request, res: Response) => {
	return res.send(DUMMY_MESSAGES);
});

router.post("/sendMessage", async (req: Request, res: Response) => {
	const newMessage: Message = {
		id: DUMMY_MESSAGES.length + 1,
		sender: req.body.user as User,
		timestamp: "now",
		text: req.body.text,
		isSent: true,
	};

	DUMMY_MESSAGES.push(newMessage);

	return res.status(200).send(newMessage);
});

export default router;

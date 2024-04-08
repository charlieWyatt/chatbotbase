import jwt from "jsonwebtoken";
import { config } from "../env";

export const createToken = (user: {
	id: string;
	email: string;
	username: string;
}) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		config.JWT_SECRET,
		{
			expiresIn: "100d",
		}
	);
};

export const decodeToken = async (token: string) => {
	// decode the token using a secret key-phrase
	const user = (await jwt.verify(token, config.JWT_SECRET)) as {
		id: string;
		email: string;
		username: string;
	};
	// TODO: handle invalid signature, expired and invalid tokens
	return user;
};

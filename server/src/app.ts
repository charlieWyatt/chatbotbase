import express, { Request, Response } from "express";
import cors from "cors";
import auth from "./auth/auth";
import messages from "./messages/messsages";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

// A test route
app.get("/", (req: Request, res: Response) => {
	res.send("Connected to backend.");
});

app.use("/auth", auth);
app.use("/messages", messages);

export default app;

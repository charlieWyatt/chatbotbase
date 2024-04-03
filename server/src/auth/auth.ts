import express, { Request, Response } from "express";

const router = express.Router();

// login 
router.post("/login", async (req: Request, res: Response) => {
    res.send("Logged in with EXAMPLE_USER_ID");
});

// logout
router.get("/logout", async (req: Request, res: Response) => {
    res.send("Logged out EXAMPLE_USER_ID");
});

// getUser
router.get("/user", async (req: Request, res: Response) => {
    res.send("Details for EXAMPLE_USER_ID");
});

export default router;
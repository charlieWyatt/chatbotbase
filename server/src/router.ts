import { router } from "./trpc";
import { userRouter } from "./modules/user/userRouter";
import { messageRouter } from "./modules/messages/messageRouter";

export type AppRouter = typeof appRouter;

export const appRouter = router({
  user: userRouter,
  message: messageRouter
});

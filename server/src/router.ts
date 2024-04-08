import { router } from "./trpc";
import { userRouter } from "./modules/user/userRouter";

export type AppRouter = typeof appRouter;

export const appRouter = router({
  user: userRouter,
});

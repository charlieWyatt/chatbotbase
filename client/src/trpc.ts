import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../server/src/router";
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:3000/trpc",
		}),
	],
});
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

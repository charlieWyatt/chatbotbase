import pino from "pino";
import pretty from "pino-pretty";

// you can make pino pretty with `pino-pretty`
// import pinoPretty from "pino-pretty";
// export const logger = pino(pinoPretty());
// or pipe server output to `pino-pretty` in your terminal

const logger = pino(
	pretty({
		minimumLevel: "debug", // for dev
		colorize: true,
		hideObject: false,
	})
);
export default logger;

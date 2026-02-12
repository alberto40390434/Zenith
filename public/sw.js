import { scramjetPath } from "@mercuryworkshop/scramjet/path";

fastify.register(fastifyStatic, {
	root: scramjetPath,
	prefix: "/scram/",
	decorateReply: false,
});

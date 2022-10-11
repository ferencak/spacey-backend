import { Server } from "@hapi/hapi";
import { Config } from "./Config";
import { routes } from "./routes/astronauts.routes";

const init = async () => {
  const server: Server = new Server({
    port: Config.PORT,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });
  routes(server);
  await server.start();
  console.log("Server on port %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(0);
});

export default init;

import { Server } from "@hapi/hapi";
import {
  createAstronaut,
  getAstronauts,
  updateAstronaut,
  deleteAstronaut,
} from "../controllers/astronauts.controller";

export const routes = (server: Server) => {
  server.route({
    method: "GET",
    path: "/astronauts",
    handler: getAstronauts,
  });
  server.route({
    method: "POST",
    path: "/create-astronaut",
    handler: createAstronaut,
  });
  server.route({
    method: "PUT",
    path: "/astronaut/update/{id}",
    handler: updateAstronaut,
  });
  server.route({
    method: "DELETE",
    path: "/astronaut/delete/{id}",
    handler: deleteAstronaut,
  });
};

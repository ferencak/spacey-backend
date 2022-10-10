import { AstronautModel } from "../models/astronaut.model";

export const addAstronaut = (req: any, res: any) => {
  const astronaut = new AstronautModel(req.body);

  astronaut.save((err: any) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        data: err,
      });
    }

    return res.send({
      status: "OK",
      message: "Successfully added astronaut",
    });
  });
};

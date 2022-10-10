import { AstronautModel } from "../models/astronaut.model";

export const updateAstronaut = (req: any, res: any) => {
  AstronautModel.findByIdAndUpdate(req.body.id, req.body, (err: any) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        data: err,
      });
    }

    return res.send({
      status: "OK",
      message: "Successfully updated astronaut",
    });
  });
};

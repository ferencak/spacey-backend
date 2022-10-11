import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { AnyKeys, AnyObject } from "mongoose";
import Astronaut, { IAstronaut } from "../models/Astronaut";

export const createAstronaut = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const astronaut = new Astronaut(
      request.payload as (AnyKeys<IAstronaut> & AnyObject) | undefined
    );
    const result = await astronaut.save();
    return h
      .response({
        status: "OK",
        data: result,
      })
      .code(200);
  } catch (error: any) {
    return h.response(error).code(500);
  }
};

export const getAstronauts = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const astronauts = await Astronaut.find();

    const response = astronauts.map((astronaut) => {
      const { _id, ...rest } = astronaut.toJSON();
      return { id: _id, ...rest };
    });

    return h
      .response({
        status: "OK",
        data: response,
      })
      .code(200);
  } catch (error: any) {
    return h.response(error).code(500);
  }
};

export const getAstronaut = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const astronaut = await Astronaut.findById(request.params.id);
    if (!astronaut) {
      return h.response("Astronaut not found").code(404);
    }
    return h
      .response({
        status: "OK",
        data: astronaut,
      })
      .code(200);
  } catch (error: any) {
    return h.response(error).code(500);
  }
};

export const updateAstronaut = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const id = request.params.id;
    const payload = <Object>request.payload;
    console.log(payload);
    const updateAstronaut = await Astronaut.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (updateAstronaut) {
      return h
        .response({
          status: "OK",
          data: updateAstronaut,
        })
        .code(200);
    }
    return h.response().code(404);
  } catch (error: any) {
    return h.response(error).code(500);
  }
};

export const deleteAstronaut = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const id = request.params.id;
    const astronaut = await Astronaut.findByIdAndDelete(id);
    if (astronaut) {
      return h
        .response({
          status: "OK",
          data: astronaut,
        })
        .code(200);
    }
    return h.response().code(404);
  } catch (error: any) {
    return h.response(error).code(500);
  }
};

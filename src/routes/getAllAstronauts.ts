import { AstronautModel } from '../models/astronaut.model'

export const getAllAstronauts = (req: any, res: any) => {
  AstronautModel.find({}, (err: any, astronauts: any) => {
    if (err) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal server error',
      })
    }

    const sanitizedAstronauts = astronauts.map((astronaut: any) => {
      const { _id, __v, ...astronautWithoutId } = astronaut.toObject()
      return { ...astronautWithoutId, id: _id }
    })

    return res.send({
      status: 'OK',
      message: 'Successfully retrieved astronauts',
      data: sanitizedAstronauts,
    })
  })
}

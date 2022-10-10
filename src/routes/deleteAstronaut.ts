import { AstronautModel } from '../models/astronaut.model'

export const deleteAstronaut = (req: any, res: any) => {
  AstronautModel.findByIdAndDelete(req.body.id, (err: any) => {
    if (err) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal server error',
        data: err,
      })
    }

    return res.send({
      status: 'OK',
      message: 'Successfully deleted astronaut',
    })
  })
}

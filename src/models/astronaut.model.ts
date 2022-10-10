import * as mongoose from 'mongoose'

const Astronaut = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  superPower: { type: String, required: true },
})

export const AstronautModel = mongoose.model('Astronaut', Astronaut)

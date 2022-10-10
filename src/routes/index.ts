import { addAstronaut } from './addAstronaut'
import { deleteAstronaut } from './deleteAstronaut'
import { getAllAstronauts } from './getAllAstronauts'
import { updateAstronaut } from './updateAstronaut'

export const routes = (app: any) => {
  app.get('/all-astronauts', getAllAstronauts)
  app.post('/add-astronaut', addAstronaut)
  app.put('/update-astronaut', updateAstronaut)
  app.delete('/delete-astronaut', deleteAstronaut)
}

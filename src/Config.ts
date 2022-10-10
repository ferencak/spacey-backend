import * as Path from 'path'
import { IConfig } from 'types/IConfig'

export const Config: IConfig = {
  LOG_PATH: process.env.LOG_PATH || Path.resolve(__dirname, '../log'),
  PORT: process.env.PORT || 3001,
  PUBLIC_PATH: process.env.PUBLIC_PATH || Path.resolve(__dirname, '../public'),
  MONGO_URL: 'mongodb+srv://admin:s1ndnFbE@cluster0.yxwiz.mongodb.net/spacey?retryWrites=true&w=majority',
}

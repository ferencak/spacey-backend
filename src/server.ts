import { Config } from "Config";
import * as BodyParser from "body-parser";
import * as Express from "express";
import { IncomingMessage } from "http";
import * as mongoose from "mongoose";
import * as Morgan from "morgan";
import * as Path from "path";
import { routes } from "routes";
import * as Winston from "winston";

const fs = require("fs");

export class Server {
  public app: any;
  public log: Winston.LoggerInstance;
  public router: Express.Router;

  constructor() {
    console.log("SpaceY - Fides Mission API");
    this.connectMongo();
    this.app = Express();
    this.setLogger();
    this.setConfig();
    this.setRoutes();
  }

  public start() {
    this.app.listen(Config.PORT);
    this.log.info(`- API started at port ${Config.PORT}!`);
  }

  private setConfig() {
    this.app.use("/", Express.static(Config.PUBLIC_PATH));
    this.app.use(BodyParser.json());
    this.app.use((req: any, res: any, next: any) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      // allow method PUT
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });
    this.log.info(`- Configs setted`);
  }

  private setRoutes() {
    routes(this.app);
    this.log.info(`- Routes setted`);
  }

  private async connectMongo() {
    try {
      await mongoose.connect(Config.MONGO_URL);
      this.log.info(`- MongoDB connected`);
    } catch (err) {
      this.log.error(`- MongoDB connection error: ${err}`);
    }
  }

  private setLogger() {
    const logFile = `${Config.LOG_PATH}/${new Date()
      .toISOString()
      .replace(/:/g, "-")}.log`;
    fs.writeFileSync(logFile, "");

    this.log = new Winston.Logger({
      transports: [
        new Winston.transports.File({
          level: "info",
          filename: Path.resolve(
            Config.LOG_PATH,
            `${new Date().toISOString().replace(/:/g, "-")}.log`
          ),
          handleExceptions: true,
          json: true,
          maxsize: 5242880,
          maxFiles: 5,
          colorize: false,
        }),
        new Winston.transports.Console({
          level: "debug",
          handleExceptions: true,
          json: false,
          colorize: true,
        }),
      ],
      exitOnError: false,
    });

    const morganOptions: Morgan.Options<IncomingMessage, any> = {
      stream: {
        write: (message: string) => {
          this.log.info(message);
        },
      },
    };

    this.app.use(Morgan("combined", morganOptions));
    this.log.info(`- Logger initialized`);
  }
}

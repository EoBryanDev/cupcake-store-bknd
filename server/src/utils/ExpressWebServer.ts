import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { IWebServer } from "../interfaces/IWebServer";
import { public_routes } from "../routes/public_routes";
// import { private_routes } from "../routes/private_routes";
import { errorHandler } from "../middlewares/error-handler";
// import { requireAuth } from "../middlewares/auth-middleware";

class ExpressWebServer implements IWebServer {
  private server: Express;
  private starTime: Date;
  constructor() {
    this.server = express();
    this.starTime = new Date();
  }

  initialize = (port: number, ip: string) => {
    this.createSecurity();
    this.createRoutes();
    this.createErrorHandler();
    this.createServer(port, ip);
  };

  createServer = (port: number, ip: string) => {
    this.server.listen(port, () => {
      console.log(`Server online on: ${ip}:${port} - ${this.starTime}`);
    });
  };
  createRoutes = () => {
    this.server.use(express.json());

    public_routes.forEach((public_route) => {
      this.server.use(public_route);
    });

    // private_routes.forEach((private_route) => {
    //   this.server.use(requireAuth, private_route);
    // });
  };

  createSecurity = () => {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    });
    this.server.use(
      helmet({
        crossOriginResourcePolicy: false,
      }),
    );
    this.server.use(cors());
    this.server.use(limiter);
  };

  createErrorHandler = () => {
    this.server.use(errorHandler);
  };
}

export { ExpressWebServer };

import { env } from "./env";
import WebServerFactory from "./utils/WebServerFactory";

const app = new WebServerFactory("express");

app.startup(env.SERVER_PORT, env.SERVER_IP);

interface IWebServer {
  initialize: (port: number, ip: string) => void;
  createServer: (port: number, ip: string) => void;
  createRoutes: () => void;
  createErrorHandler?: () => void;
  createDocumentation?: () => void;
  createSecurity?: () => void;
  createMetrics?: () => void;
  createMiddlewares?: () => void;
}
interface IWebServerFactory {
  startup: (port: number, ip: string) => void;
}

export { IWebServer, IWebServerFactory };

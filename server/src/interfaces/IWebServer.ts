interface IWebServer {
  initialize: (port: number) => void;
  createServer: (port: number) => void;
  createRoutes: () => void;
  createErrorHandler?: () => void;
  createDocumentation?: () => void;
  createSecurity?: () => void;
  createMetrics?: () => void;
  createMiddlewares?: () => void;
}
interface IWebServerFactory {
  startup: (port: number) => void;
}

export { IWebServer, IWebServerFactory };

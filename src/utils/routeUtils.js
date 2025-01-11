const clc = require("cli-color");
const getLogger = require("./consoleLoggerUtils");

function initializeRoutes(
  router,
  routes,
  parentPath = "",
  parentMiddleWare = []
) {
  if (!Array.isArray(routes)) {
    console.error(
      clc.red("Invalid routesMap. It should be an array. at" + parentPath)
    );
    return;
  }
  routes.forEach((route) => {
    if (!route || typeof route !== "object" || !("path" in route)) {
      console.error(clc.red("Invalid route object:"), route);
      return;
    }

    const path = `${parentPath}${route.path}`;
    const { methodType, controllers, middlewareArray, children } = route;
    const newMiddlewareArray = [
      ...(parentMiddleWare ?? []),
      ...(middlewareArray ?? []),
    ];

    try {
      if (
        !controllers ||
        !Array.isArray(controllers) ||
        controllers.length === 0 ||
        !("methodType" in route)
      ) {
      } else {
        router[methodType](path, newMiddlewareArray, controllers);

        getLogger(
          "Route initialized",
          "green"
        )(methodType.toUpperCase() + ": " + path);
      }
    } catch (error) {
      getLogger(
        "Error initializing the following route->",
        "red"
      )(methodType.toUpperCase() + ": " + path);
    }
    if (Array.isArray(children) && children.length > 0) {
      initializeRoutes(router, children, path, newMiddlewareArray);
    }
  });
}

module.exports = { initializeRoutes };

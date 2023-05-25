const PORT = 19035;

const { kelp } = require("./kelp");

kelp.settings({
  PORT: PORT,
  OPTIONS: [
    "body-parser",
    "cors",
    "ejs",
    "pug",
    "public",
    "routes",
  ],
  HEARTBEAT: {
    ROUTE: "/api/v1/heartbeat",
  }
});

kelp.listen();
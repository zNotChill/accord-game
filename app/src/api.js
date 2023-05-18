const PORT = 19035;

const { kelp } = require("./kelp");

kelp.settings({
  port: PORT,
  options: [
    "body-parser",
    "cors",
    "ejs",
    "pug",
    "public",
    "routes",
  ],
});

kelp.listen();
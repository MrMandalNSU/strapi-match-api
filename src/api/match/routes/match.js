"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::match.match", {
  routes: [
    {
      method: "GET",
      path: "/matches/upcoming",
      handler: "match.upcoming",
      config: { auth: false },
    },
  ],
});

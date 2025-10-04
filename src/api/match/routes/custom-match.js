"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/matches/upcoming",
      handler: "match.upcoming",
      config: {
        auth: false,
      },
    },
  ],
};

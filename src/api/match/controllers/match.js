"use strict";

/**
 * match controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::match.match", ({ strapi }) => ({
  async upcoming(ctx) {
    try {
      const now = new Date();

      const upcomingMatches = await strapi.db
        .query("api::match.match")
        .findMany({
          where: {
            date: { $gte: now.toISOString() },
          },
          orderBy: { date: "asc" },
        });

      if (!upcomingMatches || upcomingMatches.length === 0) {
        ctx.status = 200;
        return { message: "No upcoming matches available" };
      }

      return upcomingMatches;
    } catch (error) {
      ctx.status = 500;
      return { error: "An error occurred while fetching upcoming matches" };
    }
  },
}));

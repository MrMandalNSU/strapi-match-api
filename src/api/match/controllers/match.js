"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::match.match", ({ strapi }) => ({
  async upcoming(ctx) {
    try {
      const now = new Date();

      const { limit = 10, offset = 0 } = ctx.query;

      const upcomingMatches = await strapi.db
        .query("api::match.match")
        .findMany({
          where: {
            date: { $gte: now.toISOString() },
          },
          orderBy: { date: "asc" },
          limit: parseInt(limit),
          offset: parseInt(offset),
        });

      const total = await strapi.db.query("api::match.match").count({
        where: {
          date: { $gte: now.toISOString() },
        },
      });

      if (!upcomingMatches || upcomingMatches.length === 0) {
        return {
          data: [],
          meta: {
            pagination: {
              limit: parseInt(limit),
              offset: parseInt(offset),
              total: 0,
            },
          },
          message: "No upcoming matches available",
        };
      }

      return {
        data: upcomingMatches,
        meta: {
          pagination: {
            limit: parseInt(limit),
            offset: parseInt(offset),
            total: total,
          },
        },
      };
    } catch (error) {
      ctx.status = 500;
      return { error: "An error occurred while fetching upcoming matches" };
    }
  },
}));

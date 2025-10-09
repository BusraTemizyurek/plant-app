/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.local" });

const common = {
  dialect: "postgres",
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
};

const url = process.env.DATABASE_URL;

module.exports = {
  development: { ...common, url },
  test: { ...common, url },
  production: { ...common, url },
};

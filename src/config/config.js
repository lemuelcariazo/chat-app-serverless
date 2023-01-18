require("dotenv").config();

module.exports = {
  development: {
    database: {
      user: process.env.DB_USER,
    },
    connection: {
      port: process.env.PORT,
    },
    TOKEN: {
      JWT_SECRET: process.env.JWT_SECRET,
    },
  },
};

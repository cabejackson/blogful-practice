module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/my-blogful-api'
  // prob dont need this --> TEST_DB_URL= process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/my-blogful-api-test'
};

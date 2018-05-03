'use strict'
exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://sgarcia30:12345@ds049651.mlab.com:49651/photo-life-db";

exports.PORT = process.env.PORT || 8080;
// exports.API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"
exports.JWT_SECRET = process.env.JWT_SECRET || "photo-life";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY  || "7d";
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
exports.DIR_URL = process.env.DIR_URL || __dirname;

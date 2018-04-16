'use strict'
exports.DATABASE_URL ||
	process.env.DATABASE_URL ||
	global.DATABASE_URL;

exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || "photo-life";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY  || "7d";
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

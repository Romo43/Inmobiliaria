const mongoose = require("mongoose");
const RoleSchema = mongoose.Schema({name: String}, {versionKey: false});

module.exports = mongoose.model( 'Role', RoleSchema )
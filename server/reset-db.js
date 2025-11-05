const fs = require("fs");
fs.copyFileSync("seed.json", "db.json");
console.log("Database reset to initial seed");

const pool = require("./pool");

async function createUser(username,password) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
}

module.exports = {
  createUser,
};
const pool = require("./pool");

async function createUser(first_name,last_name,username,password) {
  await pool.query("INSERT INTO users (first_name, last_name, username, password ) VALUES ($1, $2, $3, $4)", [
      first_name,
      last_name,
      username,
      password,
    ]);
}

async function createMessage(title,content,user_id) {
  await pool.query("INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)", [
      title,
      content,
      user_id,
    ]);
}

module.exports = {
  createUser,
  createMessage,
};
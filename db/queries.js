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

async function upgradeMember(user_id) {
  await pool.query("UPDATE users SET membership_status = 'premium' WHERE id = ($1)", [
      user_id,
    ]);
}

async function getMessages() {
  const {rows} = await pool.query("SELECT * FROM messages");
  return rows;
}

module.exports = {
  createUser,
  createMessage,
  upgradeMember,
  getMessages,
};
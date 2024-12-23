const pool = require("./pool");

exports.addUserToDB = async (user) => {
  const { rows } = pool.query(
    "INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, false)",
    [user.fName, user.lName, user.username, user.password]
  );
  return rows;
};

exports.getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  return rows[0];
};

exports.getUserByID = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return rows[0];
};

exports.updateMembership = async (id) => {
  const { rows } = await pool.query(
    "UPDATE users SET membership_status=true WHERE id=$1",
    [id]
  );
  return rows;
};

exports.updateAdmin = async (id) => {
  const { rows } = await pool.query(
    "UPDATE users SET admin=true WHERE id=$1",
    [id]
  );
  return rows;
};

exports.addMessageToDB = async (req) => {
  const { rows } = pool.query(
    "INSERT INTO messages (author_id, message, time) VALUES ($1, $2, $3)",
    [req.user.id, req.body.msg, new Date(Date.now()).toLocaleString("en-us")]
  );
  return rows;
};

exports.getMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.*, users.username FROM messages JOIN users ON messages.author_id=users.id;"
  );

  return rows;
};

exports.deleteMsg = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM messages WHERE id=$1", [id]
  )
  return rows
}

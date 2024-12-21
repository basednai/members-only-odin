const pool = require("./pool");

exports.addUserToDB = async (user) => {
  const { rows } = pool.query(
    "INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, false)",
    [user.fName, user.lName, user.username, user.password]
  );
  return rows;
};

exports.getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );
  return rows[0];
};

exports.getUserByID = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [id]
  );
  return rows[0];
};

const db = require('../../db');

module.exports = {
  getUserPost(id, callback) {
    const queryString = 'SELECT u.id, u.name_user, u.last_name, p.id, p.image_url, p.message_post, p.show_post, p.location_post, p.created_at FROM post AS p LEFT JOIN user AS u ON p.fk_user_id = u.id WHERE p.fk_user_id = ? AND p.reported = false';
    db.connection.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  getAllReportedPosts(callback) {
    const queryString = 'SELECT u.id, u.name_user, u.last_name, p.id, p.image_url, p.message_post, p.show_post, p.location_post, p.created_at FROM post AS p LEFT JOIN user AS u ON p.fk_user_id = u.id WHERE p.reported = 1';
    db.connection.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  getUserReportedPost(id, callback) {
    const queryString = 'SELECT u.id, p.id, u.name_user, u.last_name, p.image_url, p.message_post, p.show_post, p.location_post, p.created_at FROM post AS p LEFT JOIN user AS u ON p.fk_user_id = u.id WHERE p.fk_user_id = ? AND p.reported = true';
    db.connection.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  getPostStats(id, callback) {
    const queryString = 'SELECT p.id, s.id, s.distance, s.time_hour, s.time_minutes, s.time_seconds, s.pace, s.heart_rate, s.steps, s.calories_burned, s.created_at FROM stats AS s LEFT JOIN post AS p ON s.fk_post_id = p.id WHERE s.fk_post_id = ?';
    db.connection.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  getPostComments(id, callback) {
    const queryString = 'SELECT p.id, c.id, u.name_user, u.lastname, c.message_comments, c.created_at, c.updated_at FROM comments AS c LEFT JOIN post AS p ON c.fk_post_id = p.id LEFT JOIN user AS u ON c.fk_user_id = u.id WHERE c.fk_post_id = ?';
    db.connection.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  getPostReactions(id, callback) {
    const queryString = 'SELECT p.id, u.name_user, u.last_name, rp.fk_reaction_id, r.name_reactions, r.icon, rp.created_at FROM reactions_on_post AS rp LEFT JOIN post AS p ON rp.fk_post_id = p.id LEFT JOIN user AS u ON rp.fk_user_id = u.id LEFT JOIN reactions AS r ON rp.fk_reaction_id = r.id WHERE rp.fk_post_id = ?';
    db.connection.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
};

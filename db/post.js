const db = require('../db');

const getPosts = async () => {
  const [rows] = await db.query('SELECT * FROM posts');
  return rows;
};

const createPost = async (title, content, userId) => {
  const [result] = await db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
  return result.insertId;
};

const getPostById = async (id) => {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

const updatePost = async (id, title, content) => {
  await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
  return true;
};

const deletePost = async (id) => {
  const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows === 1;
};

module.exports = {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost
};

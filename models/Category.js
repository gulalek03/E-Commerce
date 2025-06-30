import pool from '../config/db.js';

class Category {
  static async create(name) {
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async update(id, name) {
    const result = await pool.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    return true;
  }
}

export default Category;

import pool from '../config/db.js';

class Product {
  // Yeni ürün oluştur
  static async create(name, description, stock, price, category_id, main_image) {
    const result = await pool.query(
      `INSERT INTO products (name, description, stock, price, category_id, main_image) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, description, stock, price, category_id, main_image]
    );
    return result.rows[0];
  }

  // Tüm ürünleri getir (filtreleme ve sayfalama ile)
  static async getAll(filters = {}, page = 1, limit = 10) {
    let query = 'SELECT * FROM products';
    const values = [];
    const whereClauses = [];
    let counter = 1;

    // Filtreleme: kategori
    if (filters.category_id) {
      whereClauses.push(`category_id = $${counter}`);
      values.push(filters.category_id);
      counter++;
    }
    // Filtreleme: isim arama (opsiyonel)
    if (filters.name) {
      whereClauses.push(`name ILIKE $${counter}`);
      values.push(`%${filters.name}%`);
      counter++;
    }

    // Filtreleri birleştir
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    // Sayfalama
    const offset = (page - 1) * limit;
    query += ` LIMIT $${counter} OFFSET $${counter + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  // ID'ye göre ürün getir
  static async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Ürün güncelle
  static async update(id, name, description, stock, price, category_id, main_image) {
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, description = $2, stock = $3, price = $4, category_id = $5, main_image = $6 
       WHERE id = $7 
       RETURNING *`,
      [name, description, stock, price, category_id, main_image, id]
    );
    return result.rows[0];
  }

  // Ürün sil
  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return true;
  }

  // Ürüne resim ekle
  static async addImage(product_id, img_path) {
    const result = await pool.query(
      'INSERT INTO images (product_id, img_path) VALUES ($1, $2) RETURNING *',
      [product_id, img_path]
    );
    return result.rows[0];
  }

  // Ürünün resimlerini getir
  static async getImages(product_id) {
    const result = await pool.query('SELECT * FROM images WHERE product_id = $1', [product_id]);
    return result.rows;
  }

  // Belirli bir resmi sil
  static async deleteImage(image_id) {
    await pool.query('DELETE FROM images WHERE id = $1', [image_id]);
    return true;
  }
}

export default Product;

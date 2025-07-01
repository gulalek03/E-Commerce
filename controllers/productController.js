import Product from '../models/Product.js';

// Yeni ürün oluştur
export const createProduct = async (req, res) => {
  try {
    const { name, description, stock, price, category_id, main_image } = req.body;
    const product = await Product.create(name, description, stock, price, category_id, main_image);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Product creation failed' });
  }
};

// Tüm ürünleri listele (filtreleme ve sayfalama ile)
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {};

    if (req.query.category_id) filters.category_id = req.query.category_id;
    if (req.query.name) filters.name = req.query.name;

    const products = await Product.getAll(filters, page, limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Tek bir ürün getir
export const getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Ürün güncelle
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price, category_id, main_image } = req.body;
    const updatedProduct = await Product.update(id, name, description, stock, price, category_id, main_image);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
};

// Ürün sil
export const deleteProduct = async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Ürüne resim ekle
export const addImageToProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { img_path } = req.body;
    const image = await Product.addImage(product_id, img_path);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: 'Image upload failed' });
  }
};

// Ürünün resimlerini getir
export const getProductImages = async (req, res) => {
  try {
    const images = await Product.getImages(req.params.product_id);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Resim sil
export const deleteImage = async (req, res) => {
  try {
    await Product.deleteImage(req.params.image_id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

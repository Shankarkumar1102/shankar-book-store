import { useState } from "react";

import "./AdminProducts.css";

function AdminProducts({
  products = [],
  onAddProduct,
  onEdit,
  onDelete,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Notebooks",
    type: "",
    price: "",
    offer: "",
    size: "",
    color: "",
    description: "",
    image: "",
    stock: "",
  });

  const searchValue = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (!searchValue) {
      return true;
    }

    const productName = String(product.name || "")
      .trim()
      .toLowerCase();

    const category = String(product.category || "")
      .trim()
      .toLowerCase();

    const type = String(product.type || "")
      .trim()
      .toLowerCase();

    return (
      productName.includes(searchValue) ||
      category.includes(searchValue) ||
      type.includes(searchValue)
    );
  });

  const openAddForm = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "Notebooks",
      type: "",
      price: "",
      offer: "",
      size: "",
      color: "",
      description: "",
      image: "",
      stock: "",
    });

    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "Notebooks",
      type: product.type || "",
      price: product.price ?? "",
      offer: product.offer || "",
      size: product.size || "",
      color: product.color || "",
      description: product.description || "",
      image: product.image || "",
      stock: product.stock ?? "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please select a category.");
      return;
    }

    if (!formData.price) {
      alert("Please enter product price.");
      return;
    }

    const productData = {
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      type: formData.type.trim(),
      price: Number(formData.price) || 0,
      offer: formData.offer.trim(),
      size: formData.size.trim(),
      color: formData.color.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      stock: Number(formData.stock) || 0,
    };

    try {
      if (editingProduct) {
        await onEdit({
          ...editingProduct,
          ...productData,
        });
      } else {
        await onAddProduct(productData);
      }

      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (product) => {
    onDelete(product);
  };

  return (
    <div className="admin-products-page">
      <div className="admin-products-page__header">
        <div>
          <span className="admin-products-page__eyebrow">
            INVENTORY MANAGEMENT
          </span>

          <h1>Products</h1>

          <p>
            Manage your store products from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-products-page__add-button"
          onClick={openAddForm}
        >
          <span>＋</span>
          Add Product
        </button>
      </div>

      <div className="admin-products-page__search">
        <span className="admin-products-page__search-icon">
          ⌕
        </span>

        <input
          type="text"
          value={searchTerm}
          placeholder="Search product by name..."
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        {searchTerm && (
          <button
            type="button"
            className="admin-products-page__search-clear"
            onClick={() => setSearchTerm("")}
          >
            ×
          </button>
        )}
      </div>

      <div className="admin-products-page__count">
        <strong>{filteredProducts.length}</strong>

        <span>
          {filteredProducts.length === 1
            ? "Product"
            : "Products"}
        </span>

        {searchTerm && (
          <small>
            of {products.length}
          </small>
        )}
      </div>

      <div className="admin-products-page__list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              className="admin-products-page__product"
              key={`${product._id || product.id}-${index}`}
            >
              <div className="admin-products-page__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                  />
                ) : (
                  <span>📦</span>
                )}
              </div>

              <div className="admin-products-page__info">
                <span className="admin-products-page__category">
                  {product.category ||
                    product.type ||
                    "Stationery"}
                </span>

                <h3>{product.name}</h3>

                {product.description && (
                  <p>{product.description}</p>
                )}

                <div className="admin-products-page__meta">
                  {product.size && (
                    <span>
                      Size: {product.size}
                    </span>
                  )}

                  {product.color && (
                    <span>
                      Color: {product.color}
                    </span>
                  )}

                  {product.stock !== undefined &&
                    product.stock !== "" && (
                      <span>
                        Stock: {product.stock}
                      </span>
                    )}
                </div>
              </div>

              <div className="admin-products-page__price">
                <span>PRICE</span>

                <strong>₹{product.price}</strong>

                {product.offer && (
                  <small>{product.offer}</small>
                )}
              </div>

              <div className="admin-products-page__actions">
                <button
                  type="button"
                  className="admin-products-page__edit"
                  onClick={() =>
                    openEditForm(product)
                  }
                >
                  ✎ Edit
                </button>

                <button
                  type="button"
                  className="admin-products-page__delete"
                  onClick={() =>
                    handleDelete(product)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="admin-products-page__empty">
            <span>🔍</span>

            <h2>No Products Found</h2>

            <p>
              {searchTerm
                ? `No product found for "${searchTerm}".`
                : "Your product list is empty."}
            </p>

            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            ) : (
              <button
                type="button"
                onClick={openAddForm}
              >
                Add First Product
              </button>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <div className="admin-product-modal">
          <div className="admin-product-modal__overlay">
            <div className="admin-product-modal__box">
              <div className="admin-product-modal__header">
                <div>
                  <span>
                    {editingProduct
                      ? "EDIT PRODUCT"
                      : "NEW PRODUCT"}
                  </span>

                  <h2>
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="admin-product-modal__close"
                >
                  ×
                </button>
              </div>

              <form
                className="admin-product-form"
                onSubmit={handleSubmit}
              >
                <div className="admin-product-form__grid">
                  <div className="admin-product-form__field admin-product-form__field--full">
                    <label>Product Name</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Category</label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Notebooks">
                        Notebooks
                      </option>

                      <option value="Pens & Writing">
                        Pens & Writing
                      </option>

                      <option value="School & Office">
                        School & Office
                      </option>

                      <option value="Art & Craft">
                        Art & Craft
                      </option>

                      <option value="Pencil Boxes">
                        Pencil Boxes
                      </option>

                      <option value="Bottles & Tiffins">
                        Bottles & Tiffins
                      </option>

                      <option value="Keychains">
                        Keychains
                      </option>

                      <option value="Other Stationery">
                        Other Stationery
                      </option>

                      <option value="Gifting Items">
                        Gifting Items
                      </option>

                      <option value="Photo Frames">
                        Photo Frames
                      </option>

                      <option value="Resin Frames">
                        Resin Frames
                      </option>
                    </select>
                  </div>

                  <div className="admin-product-form__field">
                    <label>Type</label>

                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      placeholder="Product type"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Price</label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="₹ 0"
                      min="0"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Offer</label>

                    <input
                      type="text"
                      name="offer"
                      value={formData.offer}
                      onChange={handleChange}
                      placeholder="10% OFF"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Size</label>

                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="A4 / Large / 500ml"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Color</label>

                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="Blue / Red / Black"
                    />
                  </div>

                  <div className="admin-product-form__field">
                    <label>Stock</label>

                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="admin-product-form__field admin-product-form__field--full">
                    <label>Product Image URL</label>

                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="/images/product.jpg"
                    />
                  </div>

                  <div className="admin-product-form__field admin-product-form__field--full">
                    <label>Description</label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter product description..."
                      rows="4"
                    />
                  </div>
                </div>

                <div className="admin-product-form__actions">
                  <button
                    type="button"
                    className="admin-product-form__cancel"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-product-form__save"
                  >
                    {editingProduct
                      ? "Save Changes"
                      : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
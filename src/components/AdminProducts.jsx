import "./AdminProducts.css";

function AdminProducts({
products,
onEdit,
onDelete,
onAddProduct,
}) {
return ( <div className="admin-products"> <div className="admin-products__header"> <div> <span>INVENTORY</span> <h2>All Products</h2> <p>
Manage products available in your store. </p> </div>

```
    <button
      type="button"
      className="admin-products__add"
      onClick={onAddProduct}
    >
      + Add Product
    </button>
  </div>

  {products.length === 0 ? (
    <div className="admin-products__empty">
      <div>📦</div>
      <h3>No products found</h3>
      <p>
        Start adding products to your store.
      </p>

      <button
        type="button"
        onClick={onAddProduct}
      >
        + Add Your First Product
      </button>
    </div>
  ) : (
    <div className="admin-products__list">
      {products.map((product) => (
        <article
          className="admin-product"
          key={`${product.category}-${product.id}`}
        >
          <div className="admin-product__image">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
              />
            ) : (
              <span>📦</span>
            )}
          </div>

          <div className="admin-product__info">
            <span>
              {product.type || product.category}
            </span>

            <h3>{product.name}</h3>

            <p>
              {product.description ||
                (product.pages
                  ? `${product.pages} Pages`
                  : product.pattern || "Stationery product")}
            </p>
          </div>

          <strong className="admin-product__price">
            ₹{product.price}
          </strong>

          <div className="admin-product__actions">
            <button
              type="button"
              className="admin-product__edit"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>

            <button
              type="button"
              className="admin-product__delete"
              onClick={() => onDelete(product)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )}
</div>

);
}

export default AdminProducts;

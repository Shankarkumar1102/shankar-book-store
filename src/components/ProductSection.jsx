import "./ProductSection.css";

function ProductSection({
  title,
  eyebrow,
  products = [],
  onProductClick,
  onAddToCart,
  onViewAll,
}) {
  // Home page par maximum 4 products
  const visibleProducts = products.slice(0, 4);

  const handleProductClick = (product) => {
    if (typeof onProductClick === "function") {
      onProductClick(product);
    }
  };

  const handleProductKeyDown = (event, product) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProductClick(product);
    }
  };

  const handleAddToCart = (event, product) => {
    // Card ka click trigger nahi hoga
    event.stopPropagation();

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  return (
    <section className="product-section">
      {/* ================= HEADER ================= */}
      <div className="product-section__header">
        <div>
          {eyebrow && (
            <span className="product-section__eyebrow">
              {eyebrow}
            </span>
          )}

          <h2 className="product-section__title">
            {title}
          </h2>
        </div>

        {/* View All sirf tab show hoga
            jab onViewAll function diya gaya ho */}
        {typeof onViewAll === "function" && (
          <button
            type="button"
            className="product-section__view-all"
            onClick={onViewAll}
          >
            View All
            <span>→</span>
          </button>
        )}
      </div>

      {/* ================= PRODUCTS ================= */}
      {visibleProducts.length > 0 ? (
        <div className="product-section__row">
          {visibleProducts.map((product) => (
            <article
              className="product-card"
              key={product._id || product.id}
              role="button"
              tabIndex={0}
              onClick={() => handleProductClick(product)}
              onKeyDown={(event) =>
                handleProductKeyDown(event, product)
              }
              aria-label={`View ${product.name}`}
            >
              {/* ================= IMAGE ================= */}
              <div className="product-card__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="product-card__placeholder">
                    📦
                  </div>
                )}
              </div>

              {/* ================= INFORMATION ================= */}
              <div className="product-card__info">
                <span className="product-card__category">
                  {product.type ||
                    product.category ||
                    "Stationery"}
                </span>

                <h3>{product.name}</h3>

                <p className="product-card__details">
                  {product.pages
                    ? `${product.pages} Pages${
                        product.pattern
                          ? ` • ${product.pattern}`
                          : ""
                      }`
                    : product.pattern ||
                      product.description ||
                      ""}
                </p>

                {/* ================= PRICE ================= */}
                <div className="product-card__bottom">
                  <strong>₹{product.price}</strong>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="product-card__actions">
                  <button
                    type="button"
                    className="product-card__add"
                    onClick={(event) =>
                      handleAddToCart(event, product)
                    }
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    type="button"
                    className="product-card__details-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    View Details
                    <span>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="product-section__empty">
          No products available.
        </div>
      )}
    </section>
  );
}

export default ProductSection;
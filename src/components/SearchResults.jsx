import "./SearchResults.css";

function SearchResults({
  searchTerm,
  products = [],
  onProductClick,
  onAddToCart,
  onClearSearch,
}) {
  const search = String(searchTerm || "")
    .trim()
    .toLowerCase();

  const results = products.filter((product) => {
    const name = String(product?.name || "").toLowerCase();
    const category = String(product?.category || "").toLowerCase();
    const type = String(product?.type || "").toLowerCase();
    const description = String(
      product?.description || ""
    ).toLowerCase();
    const pattern = String(
      product?.pattern || ""
    ).toLowerCase();
    const color = String(
      product?.color || ""
    ).toLowerCase();

    return (
      name.includes(search) ||
      category.includes(search) ||
      type.includes(search) ||
      description.includes(search) ||
      pattern.includes(search) ||
      color.includes(search)
    );
  });

  const handleProductClick = (product) => {
    if (typeof onProductClick === "function") {
      onProductClick(product);
    }
  };

  const handleKeyDown = (event, product) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProductClick(product);
    }
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  return (
    <main className="search-results">
      {/* ================= HEADER ================= */}
      <div className="search-results__header">
        <span className="search-results__eyebrow">
          SEARCH RESULTS
        </span>

        <h1>
          Search results for "{searchTerm}"
        </h1>

        <p className="search-results__count">
          {results.length}{" "}
          {results.length === 1
            ? "product"
            : "products"}{" "}
          found
        </p>
      </div>

      {/* ================= BACK ================= */}
      <button
        type="button"
        className="search-results__back"
        onClick={onClearSearch}
      >
        ← Back to Home
      </button>

      {/* ================= PRODUCTS ================= */}
      {results.length > 0 ? (
        <div className="search-results__grid">
          {results.map((product) => (
            <article
              key={product._id || product.id}
              className="search-product-card"
              role="button"
              tabIndex={0}
              onClick={() =>
                handleProductClick(product)
              }
              onKeyDown={(event) =>
                handleKeyDown(event, product)
              }
              aria-label={`View ${product.name}`}
            >
              {/* ================= IMAGE ================= */}
              <div className="search-product-card__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <span>📦</span>
                )}
              </div>

              {/* ================= INFO ================= */}
              <div className="search-product-card__info">
                <span className="search-product-card__category">
                  {product.type ||
                    product.category ||
                    "Stationery"}
                </span>

                <h3>{product.name}</h3>

                <p>
                  {product.pages
                    ? `${product.pages} Pages${
                        product.pattern
                          ? ` • ${product.pattern}`
                          : ""
                      }`
                    : product.pattern ||
                      product.description ||
                      "Quality stationery product."}
                </p>

                {/* ================= PRICE ================= */}
                <div className="search-product-card__bottom">
                  <strong>
                    ₹{product.price}
                  </strong>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="search-product-card__actions">
                  <button
                    type="button"
                    className="search-product-card__add"
                    onClick={(event) =>
                      handleAddToCart(
                        event,
                        product
                      )
                    }
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    type="button"
                    className="search-product-card__details"
                    onClick={(event) => {
                      event.preventDefault();
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
        /* ================= EMPTY ================= */
        <div className="search-results__empty">
          <span>🔍</span>

          <h2>No products found</h2>

          <p>
            We couldn't find any product matching "
            {searchTerm}".
          </p>

          <button
            type="button"
            onClick={onClearSearch}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </main>
  );
}

export default SearchResults;
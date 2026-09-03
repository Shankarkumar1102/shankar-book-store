import "./CategoryResults.css";

function CategoryResults({
  category,
  products = [],
  addToCart,
  onClearCategory,
}) {
  const categoryName =
    typeof category === "object"
      ? category.name
      : category;

  const categoryProducts =
    products.length > 0
      ? products
      : typeof category === "object"
        ? category.products || []
        : [];

  const getDescription = () => {
    const descriptions = {
      Notebooks:
        "Explore notebooks for school, office and everyday writing.",
      "Pens & Writing":
        "Find pens and writing essentials for every need.",
      "School & Office":
        "Everything you need for school and office work.",
      "Art & Craft":
        "Creative art and craft supplies for every idea.",
      "Pencil Boxes":
        "Stylish and practical pencil boxes for school.",
      "Bottles & Tiffins":
        "Useful bottles and tiffins for school and everyday use.",
      Keychains:
        "Cute and stylish keychains for everyone.",
      "Other Stationery":
        "Useful stationery items for school, office and daily use.",
      "Gifting Items":
        "Thoughtful gifting items for friends and family.",
      "Photo Frames":
        "Beautiful photo frames for your favourite memories.",
      "Resin Frames":
        "Premium resin frames for special memories.",
    };

    return (
      descriptions[categoryName] ||
      `Explore our collection of ${String(
        categoryName || "products"
      ).toLowerCase()}.`
    );
  };

  return (
    <main className="category-results">
      <div className="category-results__header">
        <span className="category-results__eyebrow">
          SHOP BY CATEGORY
        </span>

        <h1>{categoryName}</h1>

        <p>{getDescription()}</p>

        <p className="category-results__count">
          {categoryProducts.length}{" "}
          {categoryProducts.length === 1
            ? "product"
            : "products"}{" "}
          found
        </p>
      </div>

      <button
        type="button"
        className="category-results__back"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (typeof onClearCategory === "function") {
            onClearCategory();
          }
        }}
      >
        ← Back to Home
      </button>

      {categoryProducts.length > 0 ? (
        <div className="category-results__grid">
          {categoryProducts.map((product) => (
            <article
              className="category-product-card"
              key={product.id}
            >
              <div className="category-product-card__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <span>📦</span>
                )}

                <button
                  type="button"
                  className="category-product-card__wishlist"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>
              </div>

              <div className="category-product-card__info">
                <span className="category-product-card__category">
                  {product.type ||
                    product.category ||
                    categoryName ||
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
                      "Quality stationery product."
                  }
                </p>

                <div className="category-product-card__bottom">
                  <strong>₹{product.price}</strong>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="category-results__empty">
          <span>📦</span>

          <h2>No products found</h2>

          <p>
            There are currently no products available in
            this category.
          </p>

          <button
            type="button"
            onClick={onClearCategory}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </main>
  );
}

export default CategoryResults;
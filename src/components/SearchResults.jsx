import "./SearchResults.css";

import notebooks from "../data/notebooks";
import pens from "../data/pens";
import keychains from "../data/keychains";
import resinFrames from "../data/resinFrames";
import photoFrames from "../data/photoFrames";
import waterBottles from "../data/waterBottles";
import artCraft from "../data/artCraft";
import geometricBoxes from "../data/geometricBoxes";

function SearchResults({
  searchTerm,
  addToCart,
  onClearSearch,
}) {
  const search = searchTerm.toLowerCase().trim();

  const allProducts = [
    ...notebooks,
    ...pens,
    ...keychains,
    ...resinFrames,
    ...photoFrames,
    ...waterBottles,
    ...artCraft,
    ...geometricBoxes,
  ];

  const filteredProducts = allProducts.filter((product) => {
    const name = String(product.name || "").toLowerCase();
    const type = String(product.type || "").toLowerCase();
    const pattern = String(product.pattern || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();
    const brand = String(product.brand || "").toLowerCase();
    const price = String(product.price || "").toLowerCase();
    const pages = String(product.pages || "").toLowerCase();
    const description = String(
      product.description || ""
    ).toLowerCase();

    return (
      name.includes(search) ||
      type.includes(search) ||
      pattern.includes(search) ||
      category.includes(search) ||
      brand.includes(search) ||
      price.includes(search) ||
      pages.includes(search) ||
      description.includes(search)
    );
  });

  return (
    <main className="search-results">
      <div className="search-results__header">
        <span className="search-results__eyebrow">
          SEARCH RESULTS
        </span>

        <h1>
          Results for{" "}
          <strong>"{searchTerm}"</strong>
        </h1>

        <p>
          {filteredProducts.length} products found
        </p>
      </div>

      <button
        type="button"
        className="search-results__back"
        onClick={onClearSearch}
      >
        ← Back to Home
      </button>

      {filteredProducts.length > 0 ? (
        <div className="search-results__grid">
          {filteredProducts.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-card__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <span className="product-card__placeholder">
                    📦
                  </span>
                )}
              </div>

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

                <div className="product-card__bottom">
                  <strong>
                    ₹{product.price}
                  </strong>

                  <button
                    type="button"
                    className="product-card__add"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    + Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="search-results__empty">
          <span>🔎</span>

          <h2>No products found</h2>

          <p>
            Try searching for notebooks, pens,
            keychains, bottles, art & craft,
            geometric boxes, resin frames or
            photo frames.
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
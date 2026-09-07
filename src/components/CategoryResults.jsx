import { useMemo, useState } from "react";
import "./CategoryResults.css";

function CategoryResults({
  category,
  products = [],
  onProductClick,
  onClearCategory,
  onAddToCart,
}) {
  const [sortBy, setSortBy] = useState("default");

  /* ==================================================
     SORT PRODUCTS
  ================================================== */

  const sortedProducts = useMemo(() => {
    const productList = [...products];

    if (sortBy === "low-high") {
      return productList.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "high-low") {
      return productList.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      return productList.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );
    }

    return productList;
  }, [products, sortBy]);

  /* ==================================================
     ADD TO CART
  ================================================== */

  const handleAddToCart = (
    event,
    product
  ) => {
    event.stopPropagation();

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  /* ==================================================
     PRODUCT CLICK
  ================================================== */

  const handleProductClick = (
    product
  ) => {
    if (
      typeof onProductClick === "function"
    ) {
      onProductClick(product);
    }
  };

  /* ==================================================
     CLEAR CATEGORY
  ================================================== */

  const handleBack = () => {
    if (
      typeof onClearCategory === "function"
    ) {
      onClearCategory();
    }
  };

  return (
    <section className="category-results">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="category-results__header">
        <div>
          <button
            className="category-results__back"
            onClick={handleBack}
          >
            ← Back
          </button>

          <span className="category-results__eyebrow">
            COLLECTION
          </span>

          <h1 className="category-results__title">
            {category}
          </h1>

          <p className="category-results__count">
            {sortedProducts.length}{" "}
            {sortedProducts.length === 1
              ? "product"
              : "products"}
          </p>
        </div>

        {/* ==================================================
            SORT
        ================================================== */}

        <div className="category-results__sort">
          <label htmlFor="product-sort">
            Sort by
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="default">
              Recommended
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

            <option value="name">
              Name
            </option>
          </select>
        </div>
      </div>

      {/* ==================================================
          PRODUCTS
      ================================================== */}

      {sortedProducts.length === 0 ? (
        <div className="category-results__empty">
          <div className="category-results__empty-icon">
            🛍️
          </div>

          <h2>
            No Products Found
          </h2>

          <p>
            There are no products available
            in this category right now.
          </p>

          <button
            className="category-results__empty-button"
            onClick={handleBack}
          >
            ← Continue Shopping
          </button>
        </div>
      ) : (
        <div className="category-results__grid">
          {sortedProducts.map(
            (product) => {
              const productId =
                product?._id ||
                product?.id;

              const image =
                product?.image;

              const price =
                Number(
                  product?.price || 0
                );

              const offer =
                product?.offer;

              return (
                <article
                  className="category-product-card"
                  key={productId}
                  onClick={() =>
                    handleProductClick(
                      product
                    )
                  }
                >
                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  <div className="category-product-card__image">
                    {image ? (
                      <img
                        src={image}
                        alt={
                          product?.name ||
                          "Product"
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div className="category-product-card__placeholder">
                        🛍️
                      </div>
                    )}

                    {offer && (
                      <span className="category-product-card__offer">
                        {offer}
                      </span>
                    )}
                  </div>

                  {/* ==================================================
                      INFO
                  ================================================== */}

                  <div className="category-product-card__info">
                    {product?.category && (
                      <span className="category-product-card__category">
                        {product.category}
                      </span>
                    )}

                    <h3>
                      {product?.name ||
                        "Unnamed Product"}
                    </h3>

                    <p className="category-product-card__description">
                      {product?.description ||
                        "Quality product from Shankar Book Store."}
                    </p>

                    {/* ==================================================
                        DETAILS
                    ================================================== */}

                    <div className="category-product-card__meta">
                      {product?.size && (
                        <span>
                          Size:{" "}
                          {product.size}
                        </span>
                      )}

                      {product?.pages && (
                        <span>
                          Pages:{" "}
                          {product.pages}
                        </span>
                      )}

                      {product?.color && (
                        <span>
                          Color:{" "}
                          {product.color}
                        </span>
                      )}
                    </div>

                    {/* ==================================================
                        PRICE
                    ================================================== */}

                    <div className="category-product-card__price">
                      ₹{price}
                    </div>

                    {/* ==================================================
                        ACTION BUTTONS
                    ================================================== */}

                    <div className="category-product-card__actions">
                      <button
                        className="category-product-card__add"
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
                        className="category-product-card__details-button"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleProductClick(
                            product
                          );
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

export default CategoryResults;
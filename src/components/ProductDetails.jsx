import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails({
  product,
  onAddToCart,
  onBack,
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  if (!product) {
    return (
      <main className="product-details">
        <div className="product-details__empty">
          <h2>Product not found</h2>

          <button
            type="button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      </main>
    );
  }

  /*
   * =====================================================
   * PRODUCT STOCK
   * =====================================================
   *
   * Every product is now independent.
   * No variants / grouping.
   */

  const stock = Number(product?.stock ?? 0);

  /*
   * =====================================================
   * QUANTITY
   * =====================================================
   */

  const increaseQuantity = () => {
    if (stock <= 0) {
      return;
    }

    if (quantity >= stock) {
      return;
    }

    setQuantity(
      (current) => current + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity(
      (current) =>
        current > 1
          ? current - 1
          : 1
    );
  };

  /*
   * =====================================================
   * ADD TO CART
   * =====================================================
   */

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (stock <= 0) {
      return;
    }

    if (
      typeof onAddToCart !==
      "function"
    ) {
      return;
    }

    onAddToCart(
      product,
      quantity
    );
  };

  /*
   * =====================================================
   * PRODUCT DETAILS
   * =====================================================
   */

  const details = [];

  if (
    product.pages !== undefined &&
    product.pages !== null &&
    product.pages !== ""
  ) {
    details.push({
      label: "Pages",
      value: product.pages,
    });
  }

  if (product.pattern) {
    details.push({
      label: "Pattern",
      value: product.pattern,
    });
  }

  if (product.type) {
    details.push({
      label: "Type",
      value: product.type,
    });
  }

  if (product.size) {
    details.push({
      label: "Size",
      value: product.size,
    });
  }

  if (product.color) {
    details.push({
      label: "Color",
      value: product.color,
    });
  }

  return (
    <main className="product-details">

      {/* =================================================
          BACK
      ================================================= */}

      <div className="product-details__top">
        <button
          type="button"
          className="product-details__back"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>

      <div className="product-details__container">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="product-details__gallery">
          <div className="product-details__main-image">

            {product.image ? (
              <img
                src={product.image}
                alt={
                  product.name ||
                  "Product"
                }
              />
            ) : (
              <div className="product-details__placeholder">
                📦
              </div>
            )}

          </div>
        </div>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="product-details__info">

          <span className="product-details__category">
            {product.type ||
              product.category ||
              "Stationery"}
          </span>

          <h1>
            {product.name}
          </h1>

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="product-details__price">
            ₹{product.price}
          </div>

          {/* =================================================
              STOCK
          ================================================= */}

          <div
            className={`product-details__stock ${
              stock <= 0
                ? "product-details__stock--out"
                : ""
            }`}
          >
            {stock <= 0
              ? "Out of Stock"
              : stock <= 5
                ? `Only ${stock} left`
                : "In Stock"}
          </div>

          {/* =================================================
              DETAILS
          ================================================= */}

          {details.length > 0 && (
            <div className="product-details__specifications">

              <h3>
                Product Details
              </h3>

              <div className="product-details__spec-grid">

                {details.map(
                  (detail) => (
                    <div
                      className="product-details__spec"
                      key={
                        detail.label
                      }
                    >
                      <span>
                        {detail.label}
                      </span>

                      <strong>
                        {detail.value}
                      </strong>
                    </div>
                  )
                )}

              </div>
            </div>
          )}

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {product.description && (
            <div className="product-details__description">

              <h3>
                Description
              </h3>

              <p>
                {product.description}
              </p>

            </div>
          )}

          {/* =================================================
              PURCHASE
          ================================================= */}

          <div className="product-details__purchase">

            <div className="product-details__quantity">

              <span>
                Quantity
              </span>

              <div className="product-details__quantity-control">

                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    quantity <= 1
                  }
                >
                  −
                </button>

                <strong>
                  {quantity}
                </strong>

                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  disabled={
                    stock <= 0 ||
                    quantity >= stock
                  }
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              className="product-details__add"
              onClick={
                handleAddToCart
              }
              disabled={
                stock <= 0
              }
            >
              {stock <= 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>

          </div>

        </div>
      </div>

    </main>
  );
}

export default ProductDetails;
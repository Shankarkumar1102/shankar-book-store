import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails({
  product,
  onAddToCart,
  onBack,
}) {
  const [selectedVariant, setSelectedVariant] =
    useState(product);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedVariant(product);
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
   * IMPORTANT
   * Variants are already grouped in App.jsx.
   * We only use product.variants here.
   */

  const variants =
    Array.isArray(product.variants) &&
    product.variants.length > 0
      ? product.variants
      : [product];

  const hasVariants =
    variants.length > 1;

  const getId = (item) =>
    item?._id || item?.id;

  /*
   * Variant name
   */

  const getVariantLabel = (variant) => {
    const name = String(
      variant?.name || ""
    ).toLowerCase();

    // Notebook variants
    if (name.includes("hindi")) {
      return "Hindi";
    }

    if (name.includes("english")) {
      return "English";
    }

    if (name.includes("maths")) {
      return "Maths";
    }

    // Generic variants
    if (variant?.color) {
      return variant.color;
    }

    if (variant?.pattern) {
      return variant.pattern;
    }

    if (variant?.size) {
      return variant.size;
    }

    if (variant?.type) {
      return variant.type;
    }

    return variant?.name || "Option";
  };

  const stock = Number(
    selectedVariant?.stock || 0
  );

  /*
   * Quantity
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
   * Variant select
   */

  const selectVariant = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * Add to cart
   */

  const handleAddToCart = () => {
    if (!selectedVariant) {
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
      selectedVariant,
      quantity
    );
  };

  /*
   * Product details
   */

  const details = [];

  if (
    selectedVariant.pages !==
      undefined &&
    selectedVariant.pages !== null &&
    selectedVariant.pages !== ""
  ) {
    details.push({
      label: "Pages",
      value: selectedVariant.pages,
    });
  }

  if (selectedVariant.pattern) {
    details.push({
      label: "Pattern",
      value: selectedVariant.pattern,
    });
  }

  if (selectedVariant.type) {
    details.push({
      label: "Type",
      value: selectedVariant.type,
    });
  }

  if (selectedVariant.size) {
    details.push({
      label: "Size",
      value: selectedVariant.size,
    });
  }

  if (selectedVariant.color) {
    details.push({
      label: "Color",
      value: selectedVariant.color,
    });
  }

  return (
    <main className="product-details">

      {/* BACK */}

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

        {/* IMAGE */}

        <div className="product-details__gallery">
          <div className="product-details__main-image">

            {selectedVariant.image ? (
              <img
                src={selectedVariant.image}
                alt={
                  selectedVariant.name
                }
              />
            ) : (
              <div className="product-details__placeholder">
                📦
              </div>
            )}

          </div>
        </div>

        {/* INFORMATION */}

        <div className="product-details__info">

          <span className="product-details__category">
            {selectedVariant.type ||
              selectedVariant.category ||
              "Stationery"}
          </span>

          <h1>
            {product.name}
          </h1>

          {/* PRICE */}

          <div className="product-details__price">
            ₹{selectedVariant.price}
          </div>

          {/* STOCK */}

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

          {/* VARIANTS */}

          {hasVariants && (
            <div className="product-details__variants">

              <h3>
                Available Options
              </h3>

              <div className="product-details__variant-list">

                {variants.map(
                  (variant) => {
                    const id =
                      getId(variant);

                    const selectedId =
                      getId(
                        selectedVariant
                      );

                    const active =
                      id ===
                      selectedId;

                    return (
                      <button
                        type="button"
                        key={
                          id ||
                          `${variant.name}-${variant.price}`
                        }
                        className={`product-details__variant ${
                          active
                            ? "product-details__variant--active"
                            : ""
                        }`}
                        onClick={() =>
                          selectVariant(
                            variant
                          )
                        }
                      >
                        <span>
                          {getVariantLabel(
                            variant
                          )}
                        </span>

                        <strong>
                          ₹
                          {
                            variant.price
                          }
                        </strong>
                      </button>
                    );
                  }
                )}

              </div>
            </div>
          )}

          {/* DETAILS */}

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
                        {
                          detail.label
                        }
                      </span>

                      <strong>
                        {
                          detail.value
                        }
                      </strong>
                    </div>
                  )
                )}

              </div>
            </div>
          )}

          {/* DESCRIPTION */}

          {selectedVariant.description && (
            <div className="product-details__description">

              <h3>
                Description
              </h3>

              <p>
                {
                  selectedVariant.description
                }
              </p>

            </div>
          )}

          {/* PURCHASE */}

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
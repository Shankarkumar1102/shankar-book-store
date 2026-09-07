import "./Cart.css";

function Cart({
  cart,
  setCart,
  isOpen,
  onClose,
  onCheckout,
}) {
  // ================= ITEM KEY =================

  const getItemKey = (item) =>
    `${item.category || "product"}-${
      item._id || item.id
    }`;

  // ================= INCREASE QUANTITY =================

  const increaseQuantity = (item) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        getItemKey(cartItem) ===
        getItemKey(item)
          ? {
              ...cartItem,
              quantity:
                Number(
                  cartItem.quantity || 0
                ) + 1,
            }
          : cartItem
      )
    );
  };

  // ================= DECREASE QUANTITY =================

  const decreaseQuantity = (item) => {
    setCart((currentCart) =>
      currentCart
        .map((cartItem) =>
          getItemKey(cartItem) ===
          getItemKey(item)
            ? {
                ...cartItem,
                quantity:
                  Number(
                    cartItem.quantity || 0
                  ) - 1,
              }
            : cartItem
        )
        .filter(
          (cartItem) =>
            Number(
              cartItem.quantity || 0
            ) > 0
        )
    );
  };

  // ================= REMOVE ITEM =================

  const removeItem = (item) => {
    setCart((currentCart) =>
      currentCart.filter(
        (cartItem) =>
          getItemKey(cartItem) !==
          getItemKey(item)
      )
    );
  };

  // ================= TOTAL ITEMS =================

  const totalItems = cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0),
    0
  );

  // ================= SUBTOTAL =================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ================= FREE DELIVERY =================

  const FREE_DELIVERY_LIMIT = 99;

  const remainingForFreeDelivery =
    Math.max(
      FREE_DELIVERY_LIMIT - subtotal,
      0
    );

  const deliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) *
      100,
    100
  );

  const isFreeDelivery =
    subtotal >= FREE_DELIVERY_LIMIT;

  return (
    <>
      {/* ==================================================
          OVERLAY
      ================================================== */}

      {isOpen && (
        <div
          className="cart-overlay"
          onClick={onClose}
        />
      )}

      {/* ==================================================
          CART DRAWER
      ================================================== */}

      <aside
        className={`cart-drawer ${
          isOpen
            ? "cart-drawer--open"
            : ""
        }`}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="cart-drawer__header">
          <div>
            <span>YOUR CART</span>

            <h2>
              Shopping Cart
            </h2>
          </div>

          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* ==================================================
            EMPTY CART
        ================================================== */}

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon">
              🛒
            </div>

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add some stationery
              products to get started.
            </p>

            <button
              type="button"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ==================================================
                FREE DELIVERY PROGRESS
            ================================================== */}

            <div className="cart-drawer__delivery-progress">
              <div className="cart-drawer__delivery-icon">
                {isFreeDelivery
                  ? "✓"
                  : "🚚"}
              </div>

              <div className="cart-drawer__delivery-content">
                {isFreeDelivery ? (
                  <>
                    <strong>
                      FREE DELIVERY
                      UNLOCKED!
                    </strong>

                    <span>
                      🎉 Your order
                      qualifies for free
                      delivery
                    </span>
                  </>
                ) : (
                  <>
                    <strong>
                      ₹
                      {
                        remainingForFreeDelivery
                      }{" "}
                      more to ₹99 FREE
                      DELIVERY
                    </strong>

                    <span>
                      Add more products
                      to get free
                      delivery
                    </span>

                    <div className="cart-drawer__delivery-bar">
                      <div
                        className="cart-drawer__delivery-bar-fill"
                        style={{
                          width: `${deliveryProgress}%`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ==================================================
                CART ITEMS
            ================================================== */}

            <div className="cart-drawer__items">
              {cart.map((item) => (
                <article
                  className="cart-drawer__item"
                  key={getItemKey(item)}
                >
                  {/* PRODUCT IMAGE */}

                  <div className="cart-drawer__image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>
                        📦
                      </span>
                    )}
                  </div>

                  {/* PRODUCT INFO */}

                  <div className="cart-drawer__info">
                    <span>
                      {item.type ||
                        item.category ||
                        "PRODUCT"}
                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.pages
                        ? `${item.pages} Pages${
                            item.pattern
                              ? ` • ${item.pattern}`
                              : ""
                          }`
                        : item.pattern ||
                          item.description ||
                          ""}
                    </p>

                    <strong>
                      ₹{item.price}
                    </strong>

                    {/* QUANTITY ACTIONS */}

                    <div className="cart-drawer__actions">
                      <div className="cart-drawer__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item
                            )
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item
                            )
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-drawer__remove"
                        onClick={() =>
                          removeItem(item)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}

                  <strong className="cart-drawer__item-total">
                    ₹
                    {Number(
                      item.price || 0
                    ) *
                      Number(
                        item.quantity || 0
                      )}
                  </strong>
                </article>
              ))}
            </div>

            {/* ==================================================
                CART SUMMARY
            ================================================== */}

            <div className="cart-drawer__summary">
              {/* PRODUCTS */}

              <div className="cart-drawer__row">
                <span>
                  Products
                </span>

                <span>
                  {totalItems}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="cart-drawer__row">
                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>
              </div>

              {/* DELIVERY */}

              <div className="cart-drawer__row">
                <span>
                  Delivery
                </span>

                <span
                  className={
                    isFreeDelivery
                      ? "cart-drawer__free"
                      : ""
                  }
                >
                  {isFreeDelivery
                    ? "FREE"
                    : "Calculated at checkout"}
                </span>
              </div>

              {/* DELIVERY NOTE */}

              <div
                style={{
                  marginTop: "4px",
                  marginBottom: "12px",
                  color: "#817679",
                  fontSize: "10px",
                  lineHeight: "1.5",
                }}
              >
                {isFreeDelivery ? (
                  <>
                    🎉 Free delivery
                    unlocked.
                  </>
                ) : (
                  <>
                    📍 Delivery charge
                    will be calculated
                    after selecting your
                    area at checkout.
                  </>
                )}
              </div>

              {/* DIVIDER */}

              <div className="cart-drawer__divider" />

              {/* TOTAL */}

              <div className="cart-drawer__total">
                <span>
                  Total
                </span>

                <strong>
                  ₹{subtotal}
                </strong>
              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                className="cart-drawer__checkout"
                onClick={onCheckout}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
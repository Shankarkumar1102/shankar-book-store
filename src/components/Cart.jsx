import { useState } from "react";
import "./Cart.css";

function Cart({
  cart,
  setCart,
  isOpen,
  onClose,
  onCheckout,
}) {
  const [deliveryArea, setDeliveryArea] = useState("");

  // ================= ITEM KEY =================

  const getItemKey = (item) =>
    `${item.category || "product"}-${item.id}`;

  // ================= INCREASE QUANTITY =================

  const increaseQuantity = (item) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        getItemKey(cartItem) === getItemKey(item)
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
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
          getItemKey(cartItem) === getItemKey(item)
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  // ================= REMOVE ITEM =================

  const removeItem = (item) => {
    setCart((currentCart) =>
      currentCart.filter(
        (cartItem) =>
          getItemKey(cartItem) !== getItemKey(item)
      )
    );
  };

  // ================= TOTAL ITEMS =================

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ================= SUBTOTAL =================

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ================= DELIVERY CHARGE =================

  let deliveryCharge = 0;

  if (totalAmount < 99) {
    if (deliveryArea === "Mahilong") {
      deliveryCharge = 10;
    } else if (deliveryArea === "Tatisilwai") {
      deliveryCharge = 20;
    } else if (deliveryArea === "Namkum") {
      deliveryCharge = 30;
    }
  }

  // ================= FINAL TOTAL =================

  const finalTotal = totalAmount + deliveryCharge;

  return (
    <>
      {/* ================= OVERLAY ================= */}

      {isOpen && (
        <div
          className="cart-overlay"
          onClick={onClose}
        />
      )}

      {/* ================= CART DRAWER ================= */}

      <aside
        className={`cart-drawer ${
          isOpen ? "cart-drawer--open" : ""
        }`}
      >
        {/* ================= HEADER ================= */}

        <div className="cart-drawer__header">
          <div>
            <span>YOUR CART</span>
            <h2>Shopping Cart</h2>
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

        {/* ================= EMPTY CART ================= */}

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon">
              🛒
            </div>

            <h3>Your cart is empty</h3>

            <p>
              Add some stationery products
              to get started.
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
            {/* ================= CART ITEMS ================= */}

            <div className="cart-drawer__items">
              {cart.map((item) => (
                <article
                  className="cart-drawer__item"
                  key={getItemKey(item)}
                >
                  <div className="cart-drawer__image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>📦</span>
                    )}
                  </div>

                  <div className="cart-drawer__info">
                    <span>
                      {item.type ||
                        item.category ||
                        "PRODUCT"}
                    </span>

                    <h3>{item.name}</h3>

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

                    <div className="cart-drawer__actions">
                      <div className="cart-drawer__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item)
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item)
                          }
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

                  <strong className="cart-drawer__item-total">
                    ₹
                    {Number(item.price || 0) *
                      Number(item.quantity || 0)}
                  </strong>
                </article>
              ))}
            </div>

            {/* ================= SUMMARY ================= */}

            <div className="cart-drawer__summary">

              {/* PRODUCTS */}

              <div className="cart-drawer__row">
                <span>Products</span>
                <span>{totalItems}</span>
              </div>

              {/* SUBTOTAL */}

              <div className="cart-drawer__row">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              {/* ================= DELIVERY AREA ================= */}

              <div
                style={{
                  marginTop: "14px",
                  marginBottom: "10px",
                }}
              >
                <label
                  htmlFor="cart-delivery-area"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "var(--color-plum)",
                  }}
                >
                  Delivery Area
                </label>

                <select
                  id="cart-delivery-area"
                  value={deliveryArea}
                  onChange={(e) =>
                    setDeliveryArea(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border:
                      "1px solid var(--color-light-border)",
                    borderRadius: "10px",
                    backgroundColor:
                      "var(--color-white)",
                    color: "var(--color-ink)",
                    fontSize: "11px",
                    fontWeight: "600",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">
                    Select your area
                  </option>

                  <option value="Mahilong">
                    Mahilong
                  </option>

                  <option value="Tatisilwai">
                    Tatisilwai
                  </option>

                  <option value="Namkum">
                    Namkum
                  </option>
                </select>
              </div>

              {/* ================= DELIVERY ================= */}

              <div className="cart-drawer__row">
                <span>Delivery</span>

                {totalAmount >= 99 ? (
                  <span className="cart-drawer__free">
                    FREE
                  </span>
                ) : !deliveryArea ? (
                  <span>Select Area</span>
                ) : (
                  <span>₹{deliveryCharge}</span>
                )}
              </div>

              {/* ================= DELIVERY MESSAGE ================= */}

              {totalAmount >= 99 ? (
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    color: "#668b6b",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  🎉 Your order qualifies for
                  FREE delivery.
                </div>
              ) : !deliveryArea ? (
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    color: "#817679",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  📍 Select your delivery area
                  to see the delivery charge.
                </div>
              ) : deliveryArea === "Mahilong" ? (
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    color: "#668b6b",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  🚚 Mahilong delivery charge:
                  ₹10
                </div>
              ) : deliveryArea === "Tatisilwai" ? (
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    color: "#668b6b",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  🚚 Tatisilwai delivery charge:
                  ₹20
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    color: "#668b6b",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  🚚 Namkum delivery charge:
                  ₹30
                </div>
              )}

              {/* ================= DIVIDER ================= */}

              <div className="cart-drawer__divider" />

              {/* ================= FINAL TOTAL ================= */}

              <div className="cart-drawer__total">
                <span>Total</span>

                <strong>
                  ₹{finalTotal}
                </strong>
              </div>

              {/* ================= CHECKOUT ================= */}

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
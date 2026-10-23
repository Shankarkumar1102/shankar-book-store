import { useState } from "react";
import "./Checkout.css";

function Checkout({
  cart,
  onPlaceOrder,
  onBackToCart,
}) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
  });

  // ==================================================
  // TOTAL ITEMS
  // ==================================================
  const totalItems = cart.length;

  // ==================================================
  // SUBTOTAL
  // ==================================================
  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0),
    0
  );

  // ==================================================
  // DELIVERY CHARGE
  // ==================================================
  // ₹299 or above = FREE
  // Below ₹299 = ₹49
  const deliveryCharge =
    totalAmount >= 299 ? 0 : 49;

  // ==================================================
  // FINAL TOTAL
  // ==================================================
  const finalTotal =
    totalAmount + deliveryCharge;

  // ==================================================
  // HANDLE INPUT CHANGE
  // ==================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ==================================================
  // SUBMIT ORDER
  // ==================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.area
    ) {
      alert(
        "Please fill all customer details."
      );
      return;
    }

    if (customer.phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    onPlaceOrder(customer);
  };

  return (
    <main className="checkout">

      {/* ================= HEADER ================= */}
      <div className="checkout__header">

        <button
          type="button"
          className="checkout__back-top"
          onClick={onBackToCart}
        >
          ← Back to Cart
        </button>

        <span className="checkout__eyebrow">
          COMPLETE YOUR ORDER
        </span>

        <h1>
          Checkout <strong>Details</strong>
        </h1>

        <p>
          Enter your details and place your
          stationery order.
        </p>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="checkout__content">

        {/* ==================================================
            CUSTOMER FORM
        ================================================== */}
        <form
          className="checkout__form"
          onSubmit={handleSubmit}
        >

          {/* SECTION TITLE */}
          <div className="checkout__section-title">
            <span>01</span>

            <div>
              <h2>Customer Details</h2>

              <p>
                Where should we deliver your order?
              </p>
            </div>
          </div>

          {/* ================= FIELDS ================= */}
          <div className="checkout__fields">

            {/* NAME */}
            <div className="checkout__field">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={customer.name}
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <div className="checkout__field">
              <label htmlFor="phone">
                Mobile Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength="10"
                placeholder="10-digit mobile number"
                value={customer.phone}
                onChange={(e) => {
                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                  setCustomer((current) => ({
                    ...current,
                    phone: value,
                  }));
                }}
              />
            </div>

            {/* ADDRESS */}
            <div className="checkout__field checkout__field--full">
              <label htmlFor="address">
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                rows="4"
                placeholder="House no., street, landmark..."
                value={customer.address}
                onChange={handleChange}
              />
            </div>

            {/* AREA */}
            <div className="checkout__field checkout__field--full">
              <label htmlFor="area">
                Delivery Area
              </label>

              <select
                id="area"
                name="area"
                value={customer.area}
                onChange={handleChange}
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

          </div>

          {/* ==================================================
              DELIVERY INFORMATION
          ================================================== */}
          <div className="checkout__delivery-note">

            <span>🚚</span>

            <div>
              <strong>
                Local Evening Delivery
              </strong>

              <p>
                Mahilong • Tatisilwai • Namkum
                <br />
                Delivery available from 4 PM – 9 PM
              </p>
            </div>

          </div>

          {/* ================= BUTTONS ================= */}
          <div className="checkout__buttons">

            <button
              type="button"
              className="checkout__back"
              onClick={onBackToCart}
            >
              ← Back to Cart
            </button>

            <button
              type="submit"
              className="checkout__place-order"
            >
              Place Order →
            </button>

          </div>

        </form>

        {/* ==================================================
            ORDER SUMMARY
        ================================================== */}
        <aside className="checkout__summary">

          {/* SUMMARY HEADER */}
          <div className="checkout__summary-header">

            <span>
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>

          </div>

          {/* ==================================================
              PRODUCTS
          ================================================== */}
          <div className="checkout__products">

            {cart.map((item) => (
              <div
                className="checkout__product"
                key={`${item.category || "product"}-${item.id}`}
              >

                {/* PRODUCT IMAGE */}
                <div className="checkout__product-image">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <span>📦</span>
                  )}

                </div>

                {/* PRODUCT INFO */}
                <div className="checkout__product-info">

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
                      : item.pattern || ""}
                  </p>
</div>

                {/* ITEM TOTAL */}
                <strong>₹{Number(item.price || 0)}</strong>

              </div>
            ))}

          </div>

          {/* ==================================================
              TOTALS
          ================================================== */}
          <div className="checkout__totals">

            {/* PRODUCTS */}
            <div className="checkout__row">
              <span>
                Products
              </span>

              <span>
                {totalItems}
              </span>
            </div>

            {/* SUBTOTAL */}
            <div className="checkout__row">
              <span>
                Subtotal
              </span>

              <span>
                ₹{totalAmount}
              </span>
            </div>

            {/* DELIVERY */}
            <div className="checkout__row">
              <span>
                Delivery
              </span>

              {deliveryCharge === 0 ? (
                <span className="checkout__free">
                  FREE
                </span>
              ) : (
                <span className="checkout__delivery-charge">
                  ₹49
                </span>
              )}
            </div>

            {/* FREE DELIVERY MESSAGE */}
            {totalAmount < 299 && (
              <div className="checkout__delivery-message">
                Add ₹{299 - totalAmount} more
                for FREE delivery
              </div>
            )}

            {/* DIVIDER */}
            <div className="checkout__divider" />

            {/* FINAL TOTAL */}
            <div className="checkout__total">

              <span>
                Total
              </span>

              <strong>
                ₹{finalTotal}
              </strong>

            </div>

          </div>

          {/* ==================================================
              PAYMENT INFO
          ================================================== */}
          <div className="checkout__payment">

            <span>💵</span>

            <div>
              <strong>
                Payment on Delivery
              </strong>

              <p>
                Pay when your order is delivered.
              </p>
            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}

export default Checkout;
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

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

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
    if (customer.area === "Mahilong") {
      deliveryCharge = 10;
    } else if (customer.area === "Tatisilwai") {
      deliveryCharge = 20;
    } else if (customer.area === "Namkum") {
      deliveryCharge = 30;
    }
  }

  const finalTotal =
    totalAmount + deliveryCharge;

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ================= PHONE CHANGE =================

  const handlePhoneChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setCustomer((current) => ({
      ...current,
      phone: value,
    }));
  };

  // ================= PLACE ORDER =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (customer.phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!customer.address.trim()) {
      alert(
        "Please enter your delivery address."
      );
      return;
    }

    if (!customer.area) {
      alert(
        "Please select your delivery area."
      );
      return;
    }

    onPlaceOrder({
      ...customer,
      deliveryCharge,
      subtotal: totalAmount,
      total: finalTotal,
    });
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

      {/* ================= CONTENT ================= */}

      <div className="checkout__content">

        {/* ================= CUSTOMER FORM ================= */}

        <form
          className="checkout__form"
          onSubmit={handleSubmit}
        >

          <div className="checkout__section-title">

            <span>01</span>

            <div>
              <h2>Customer Details</h2>

              <p>
                Enter your delivery information.
              </p>
            </div>

          </div>

          <div className="checkout__fields">

            {/* ================= NAME ================= */}

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

            {/* ================= PHONE ================= */}

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
                onChange={handlePhoneChange}
              />

            </div>

            {/* ================= ADDRESS ================= */}

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

            {/* ================= AREA ================= */}

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

          {/* ================= DELIVERY INFO ================= */}

          <div className="checkout__delivery-note">

            <span>🚚</span>

            <div>

              <strong>
                Local Delivery
              </strong>

              <p>
                Mahilong • Tatisilwai • Namkum
                <br />
                Delivery available from 4 PM – 9 PM
              </p>

            </div>

          </div>

          {/* ================= CURRENT DELIVERY CHARGE ================= */}

          <div className="checkout__delivery-status">

            <div>
              <span>Delivery Charge</span>

              <strong>
                {totalAmount >= 99
                  ? "FREE"
                  : customer.area
                  ? `₹${deliveryCharge}`
                  : "Select Area"}
              </strong>
            </div>

            <p>

              {totalAmount >= 99
                ? "🎉 Your order qualifies for FREE delivery."
                : customer.area === "Mahilong"
                ? "🚚 Mahilong delivery charge is ₹10."
                : customer.area === "Tatisilwai"
                ? "🚚 Tatisilwai delivery charge is ₹20."
                : customer.area === "Namkum"
                ? "🚚 Namkum delivery charge is ₹30."
                : "📍 Select your area to see the delivery charge."}

            </p>

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

        {/* ================= ORDER SUMMARY ================= */}

        <aside className="checkout__summary">

          <div className="checkout__summary-header">

            <span>
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>

          </div>

          {/* ================= PRODUCTS ================= */}

          <div className="checkout__products">

            {cart.map((item) => (

              <div
                className="checkout__product"
                key={`${item.category || "product"}-${item.id}`}
              >

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
                      : item.pattern ||
                        item.description ||
                        ""}
                  </p>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

                <strong>
                  ₹
                  {Number(item.price || 0) *
                    Number(item.quantity || 0)}
                </strong>

              </div>

            ))}

          </div>

          {/* ================= TOTALS ================= */}

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

              <span>

                {totalAmount >= 99 ? (

                  <span className="checkout__free">
                    FREE
                  </span>

                ) : !customer.area ? (

                  <span className="checkout__delivery-charge">
                    Select Area
                  </span>

                ) : (

                  <span className="checkout__delivery-charge">
                    ₹{deliveryCharge}
                  </span>

                )}

              </span>

            </div>

            {/* ================= DELIVERY MESSAGE ================= */}

            {totalAmount >= 99 ? (

              <div className="checkout__delivery-message">

                🎉 FREE delivery on orders
                of ₹99 or above.

              </div>

            ) : customer.area === "Mahilong" ? (

              <div className="checkout__delivery-message">

                🚚 Mahilong delivery charge:
                ₹10

              </div>

            ) : customer.area === "Tatisilwai" ? (

              <div className="checkout__delivery-message">

                🚚 Tatisilwai delivery charge:
                ₹20

              </div>

            ) : customer.area === "Namkum" ? (

              <div className="checkout__delivery-message">

                🚚 Namkum delivery charge:
                ₹30

              </div>

            ) : (

              <div className="checkout__delivery-message">

                📍 Select your delivery area
                to calculate delivery charges.

              </div>

            )}

            {/* ================= DIVIDER ================= */}

            <div className="checkout__divider" />

            {/* ================= FINAL TOTAL ================= */}

            <div className="checkout__total">

              <span>
                Total
              </span>

              <strong>
                ₹{finalTotal}
              </strong>

            </div>

          </div>

          {/* ================= PAYMENT ================= */}

          <div className="checkout__payment">

            <span>💵</span>

            <div>

              <strong>
                Cash on Delivery
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
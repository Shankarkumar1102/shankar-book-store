import "./OrderConfirmation.css";

function OrderConfirmation({
  customer,
  cart = [],
  subtotal = 0,
  deliveryCharge = 0,
  totalAmount,
  orderId,
  onContinueShopping,
}) {
  const calculatedSubtotal = Number(subtotal) ||
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

  const calculatedDelivery = Number(deliveryCharge) || 0;

  const finalAmount =
    totalAmount !== undefined && totalAmount !== null
      ? Number(totalAmount)
      : calculatedSubtotal + calculatedDelivery;

  return (
    <main className="order-confirmation">
      <div className="order-confirmation__card">
        {/* SUCCESS ICON */}
        <div className="order-confirmation__icon">
          ✓
        </div>

        {/* HEADING */}
        <span className="order-confirmation__eyebrow">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank you, <strong>{customer?.name || "Customer"}</strong>!
        </h1>

        <p className="order-confirmation__message">
          Your order has been placed successfully.
          We will deliver it to you soon.
        </p>

        {/* ORDER ID */}
        <div className="order-confirmation__order-id">
          <span>ORDER ID</span>
          <strong>#{orderId}</strong>
        </div>

        {/* ORDER DETAILS */}
        <div className="order-confirmation__details">
          <div className="order-confirmation__details-header">
            <span>YOUR ORDER</span>
            <h2>Order Summary</h2>
          </div>

          {/* ORDERED PRODUCTS */}
          {cart.map((item, index) => (
            <div
              className="order-confirmation__product"
              key={item.id ?? item._id ?? `${item.name}-${index}`}
            >
              <div className="order-confirmation__product-icon">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "🎁"
                )}
              </div>

              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.quantity}</p>
              </div>

              <strong>
                ₹
                {(
                  Number(item.price || 0) *
                  Number(item.quantity || 0)
                ).toFixed(2).replace(/\.00$/, "")}
              </strong>
            </div>
          ))}

          {/* PRICE BREAKDOWN */}
          <div className="order-confirmation__price-breakdown">
            <div className="order-confirmation__price-row">
              <span>Subtotal</span>
              <strong>
                ₹
                {calculatedSubtotal
                  .toFixed(2)
                  .replace(/\.00$/, "")}
              </strong>
            </div>

            <div className="order-confirmation__price-row">
              <span>Delivery Charge</span>

              <strong
                className={
                  calculatedDelivery === 0
                    ? "order-confirmation__free-delivery"
                    : ""
                }
              >
                {calculatedDelivery === 0
                  ? "FREE"
                  : `₹${calculatedDelivery}`}
              </strong>
            </div>
          </div>

          {/* FINAL TOTAL */}
          <div className="order-confirmation__total">
            <span>Total Amount</span>
            <strong>
              ₹
              {finalAmount
                .toFixed(2)
                .replace(/\.00$/, "")}
            </strong>
          </div>

          <p className="order-confirmation__payment">
            💵 Payment Method: Cash on Delivery
          </p>
        </div>

        {/* DELIVERY DETAILS */}
        <div className="order-confirmation__delivery">
          <div className="order-confirmation__delivery-icon">
            🚚
          </div>

          <div>
            <strong>Delivery Address</strong>

            <p>{customer?.name}</p>
            <p>{customer?.phone}</p>
            <p>{customer?.area}</p>

            <small>{customer?.address}</small>
          </div>
        </div>

        {/* CONTINUE SHOPPING */}
        <button
          type="button"
          className="order-confirmation__button"
          onClick={onContinueShopping}
        >
          Continue Shopping →
        </button>
      </div>
    </main>
  );
}

export default OrderConfirmation;
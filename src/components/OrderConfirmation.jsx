import "./OrderConfirmation.css";

function OrderConfirmation({
  customer,
  cart,
  totalAmount,
  orderId,
  onContinueShopping,
}) {
  return (
    <main className="order-confirmation">

      <div className="order-confirmation__card">

        {/* Success Icon */}

        <div className="order-confirmation__icon">
          ✓
        </div>

        {/* Heading */}

        <span className="order-confirmation__eyebrow">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank you, <strong>{customer?.name}</strong>!
        </h1>

        <p className="order-confirmation__message">
          Your stationery order has been placed successfully.
          We will deliver it to you soon.
        </p>


        {/* Order ID */}

        <div className="order-confirmation__order-id">

          <span>
            ORDER ID
          </span>

          <strong>
            #{orderId}
          </strong>

        </div>


        {/* Order Details */}

        <div className="order-confirmation__details">

          <div className="order-confirmation__details-header">
            <span>
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>
          </div>


          {cart.map((item) => (

            <div
              className="order-confirmation__product"
              key={item.id}
            >

              <div className="order-confirmation__product-icon">
                📓
              </div>

              <div>
                <h3>
                  {item.name}
                </h3>

                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}


          {/* Total */}

          <div className="order-confirmation__total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

        </div>


        {/* Delivery Details */}

        <div className="order-confirmation__delivery">

          <div className="order-confirmation__delivery-icon">
            🚚
          </div>

          <div>

            <strong>
              Delivery to
            </strong>

            <p>
              {customer?.area}
            </p>

            <small>
              {customer?.address}
            </small>

          </div>

        </div>


        {/* Continue Shopping */}

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
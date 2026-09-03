import { useState } from "react";
import "./AdminOrders.css";

function AdminOrders({ orders = [] }) {
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  // ================= STATUS OPTIONS =================
  const statusOptions = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // ================= FILTER =================
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "All") {
      return true;
    }

    return order.status === statusFilter;
  });

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ================= STATUS CLASS =================
  const getStatusClass = (status) => {
    return (
      status?.toLowerCase() || "pending"
    );
  };

  return (
    <main className="admin-orders">

      {/* ================= HEADER ================= */}
      <div className="admin-orders__header">

        <div>
          <span>
            ORDER MANAGEMENT
          </span>

          <h1>
            Orders
          </h1>

          <p>
            View and manage all customer orders.
          </p>
        </div>

        <div className="admin-orders__total">
          <strong>
            {orders.length}
          </strong>

          <span>
            Total Orders
          </span>
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="admin-orders__stats">

        <div>
          <span>🕐</span>

          <div>
            <p>Pending</p>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "Pending"
                ).length
              }
            </strong>
          </div>
        </div>

        <div>
          <span>✓</span>

          <div>
            <p>Confirmed</p>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "Confirmed"
                ).length
              }
            </strong>
          </div>
        </div>

        <div>
          <span>🚚</span>

          <div>
            <p>Shipped</p>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "Shipped"
                ).length
              }
            </strong>
          </div>
        </div>

        <div>
          <span>✓</span>

          <div>
            <p>Delivered</p>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "Delivered"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="admin-orders__toolbar">

        <div>
          <span>
            SHOW
          </span>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Orders
            </option>

            {statusOptions.map((status) => (
              <option
                value={status}
                key={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

        <span className="admin-orders__count">
          {filteredOrders.length} orders
        </span>

      </div>

      {/* ================= ORDERS ================= */}
      {filteredOrders.length > 0 ? (
        <div className="admin-orders__list">

          {filteredOrders.map((order) => (

            <article
              className="admin-order-card"
              key={order.orderId}
            >

              {/* Order Header */}
              <div className="admin-order-card__header">

                <div>
                  <span>
                    ORDER ID
                  </span>

                  <strong>
                    #{order.orderId}
                  </strong>
                </div>

                <span
                  className={`admin-order-card__status admin-order-card__status--${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status || "Pending"}
                </span>

              </div>

              {/* Customer */}
              <div className="admin-order-card__customer">

                <div>
                  <span>
                    CUSTOMER
                  </span>

                  <strong>
                    {order.customer?.name ||
                      "Unknown Customer"}
                  </strong>

                  <p>
                    {order.customer?.phone ||
                      "No phone number"}
                  </p>
                </div>

                <div>
                  <span>
                    ORDER DATE
                  </span>

                  <strong>
                    {formatDate(
                      order.createdAt
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    TOTAL
                  </span>

                  <strong>
                    ₹{order.totalAmount || 0}
                  </strong>
                </div>

              </div>

              {/* Items */}
              <div className="admin-order-card__items">

                <span>
                  ITEMS
                </span>

                {order.cart?.map((item) => (
                  <div
                    key={`${item.category}-${item.id}`}
                  >
                    <span>
                      {item.name}
                    </span>

                    <span>
                      × {item.quantity}
                    </span>

                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>
                  </div>
                ))}

              </div>

              {/* Footer */}
              <div className="admin-order-card__footer">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                >
                  View Details →
                </button>

              </div>

            </article>

          ))}

        </div>
      ) : (
        <div className="admin-orders__empty">

          <span>
            🛒
          </span>

          <h2>
            No Orders Found
          </h2>

          <p>
            Customer orders will appear here
            once they are placed.
          </p>

        </div>
      )}

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div className="admin-order-modal">

          <div
            className="admin-order-modal__overlay"
            onClick={() =>
              setSelectedOrder(null)
            }
          />

          <div className="admin-order-modal__content">

            {/* Header */}
            <div className="admin-order-modal__header">

              <div>
                <span>
                  ORDER DETAILS
                </span>

                <h2>
                  #{selectedOrder.orderId}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>

            {/* Customer Details */}
            <div className="admin-order-modal__section">

              <span>
                CUSTOMER
              </span>

              <div className="admin-order-modal__customer">

                <strong>
                  {selectedOrder.customer?.name ||
                    "Unknown Customer"}
                </strong>

                <p>
                  📱{" "}
                  {selectedOrder.customer?.phone ||
                    "No phone number"}
                </p>

                <p>
                  📍{" "}
                  {selectedOrder.customer?.area ||
                    ""}
                </p>

                <p>
                  {selectedOrder.customer?.address ||
                    "No address"}
                </p>

              </div>

            </div>

            {/* Items */}
            <div className="admin-order-modal__section">

              <span>
                ORDER ITEMS
              </span>

              <div className="admin-order-modal__items">

                {selectedOrder.cart?.map(
                  (item) => (
                    <div
                      key={`${item.category}-${item.id}`}
                    >

                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          × {item.quantity}
                        </span>
                      </div>

                      <strong>
                        ₹
                        {item.price *
                          item.quantity}
                      </strong>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Total */}
            <div className="admin-order-modal__total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {selectedOrder.totalAmount ||
                  0}
              </strong>

            </div>

            {/* Payment */}
            <div className="admin-order-modal__payment">

              <span>
                PAYMENT
              </span>

              <strong>
                💵 Cash on Delivery
              </strong>

            </div>

            {/* Close */}
            <button
              type="button"
              className="admin-order-modal__close"
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default AdminOrders;
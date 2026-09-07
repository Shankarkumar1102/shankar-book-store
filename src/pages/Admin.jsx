import { useEffect, useState } from "react";

import "./Admin.css";

import AdminProducts from "./AdminProducts";

import products from "../data/products";
import notebooks from "../data/notebooks";
import pens from "../data/pens";
import schoolOffice from "../data/schoolOffice";
import artCraft from "../data/artCraft";
import pencilBoxes from "../data/pencilBoxes";
import bottlesTiffins from "../data/bottlesTiffins";
import keychains from "../data/keychains";
import otherStationery from "../data/otherStationery";
import giftingItems from "../data/giftingItems";
import photoFrames from "../data/photoFrames";
import resinFrames from "../data/resinFrames";
import trendingProducts from "../data/trendingProducts";

const API_URL =
  "https://shankar-book-store-2.onrender.com/api/products";

const ORDERS_API_URL =
  "https://shankar-book-store-2.onrender.com/api/orders";

function Admin({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  // =========================================================
  // PRODUCTS
  // =========================================================

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // ORDERS
  // =========================================================

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  // =========================================================
  // ORDER FILTER
  // =========================================================

  const [orderStatusFilter, setOrderStatusFilter] =
    useState("All");

  const [orderSearch, setOrderSearch] = useState("");

  // =========================================================
  // LOCAL PRODUCTS
  // =========================================================

  const localProducts = [
    ...products,
    ...notebooks,
    ...pens,
    ...schoolOffice,
    ...artCraft,
    ...pencilBoxes,
    ...bottlesTiffins,
    ...keychains,
    ...otherStationery,
    ...giftingItems,
    ...photoFrames,
    ...resinFrames,
    ...trendingProducts,
  ];

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = [
    ...new Set(
      productList
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (data.length === 0 && localProducts.length > 0) {
        const importResponse = await fetch(
          `${API_URL}/bulk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(localProducts),
          }
        );

        if (!importResponse.ok) {
          throw new Error(
            "Failed to import existing products"
          );
        }

        const importedProducts =
          await importResponse.json();

        setProductList(importedProducts);
      } else {
        setProductList(data);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to the server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD ORDERS
  // =========================================================

  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");

      const response = await fetch(ORDERS_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Orders loading error:", error);

      setOrdersError(
        "Unable to load orders. Please check your backend."
      );
    } finally {
      setOrdersLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  // =========================================================
  // LOAD ORDERS WHEN ORDERS PAGE OPENS
  // =========================================================

  useEffect(() => {
    if (activePage === "orders") {
      loadOrders();
    }
  }, [activePage]);

  // =========================================================
  // ADMIN BROWSER HISTORY
  // =========================================================

  useEffect(() => {
    const currentState = window.history.state;

    if (
      currentState?.page === "admin" &&
      currentState.adminPage
    ) {
      setActivePage(currentState.adminPage);
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;

      if (
        state?.page === "admin" &&
        state.adminPage
      ) {
        setActivePage(state.adminPage);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  // =========================================================
  // CHANGE ADMIN PAGE
  // =========================================================

  const changeAdminPage = (page) => {
    if (page === activePage) {
      return;
    }

    setActivePage(page);

    window.history.pushState(
      {
        page: "admin",
        adminPage: page,
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADD PRODUCT
  // =========================================================

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price) || 0,
          stock: Number(newProduct.stock) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const savedProduct = await response.json();

      setProductList((currentProducts) => [
        savedProduct,
        ...currentProducts,
      ]);

      alert("Product added successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to add product.");
    }
  };

  // =========================================================
  // EDIT PRODUCT
  // =========================================================

  const handleEditProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `${API_URL}/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedProduct.name,
            category: updatedProduct.category,
            type: updatedProduct.type,
            price: Number(updatedProduct.price) || 0,
            offer: updatedProduct.offer,
            size: updatedProduct.size,
            color: updatedProduct.color,
            description: updatedProduct.description,
            image: updatedProduct.image,
            stock: Number(updatedProduct.stock) || 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const savedProduct = await response.json();

      setProductList((currentProducts) =>
        currentProducts.map((product) =>
          product._id === savedProduct._id
            ? savedProduct
            : product
        )
      );

      alert("Product updated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to update product.");
    }
  };

  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${product._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProductList((currentProducts) =>
        currentProducts.filter(
          (item) => item._id !== product._id
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete product.");
    }
  };

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const handleOrderStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `${ORDERS_API_URL}/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update order status"
        );
      }

      const updatedOrder = await response.json();

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === updatedOrder._id
            ? updatedOrder
            : order
        )
      );

      alert("Order status updated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to update order status.");
    }
  };

  // =========================================================
  // DELETE ORDER
  // =========================================================

  const handleDeleteOrder = async (order) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this order?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${ORDERS_API_URL}/${order._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (item) => item._id !== order._id
        )
      );

      alert("Order deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete order.");
    }
  };

  // =========================================================
  // VIEW STORE
  // =========================================================

  const handleViewStore = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    if (onLogout) {
      onLogout();
    }
  };

  // =========================================================
  // ORDER CALCULATIONS
  // =========================================================

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter(
      (order) => order.status !== "Cancelled"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  // =========================================================
  // FILTER ORDERS
  // =========================================================

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      orderStatusFilter === "All" ||
      order.status === orderStatusFilter;

    const search = orderSearch
      .toLowerCase()
      .trim();

    if (!search) {
      return matchesStatus;
    }

    const customerName =
      order.customer?.name?.toLowerCase() || "";

    const customerMobile =
      order.customer?.mobile?.toLowerCase() || "";

    const customerArea =
      order.customer?.area?.toLowerCase() || "";

    const orderId =
      order._id?.toLowerCase() || "";

    const matchesSearch =
      customerName.includes(search) ||
      customerMobile.includes(search) ||
      customerArea.includes(search) ||
      orderId.includes(search);

    return matchesStatus && matchesSearch;
  });

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // ORDER STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "admin__order-status admin__order-status--confirmed";

      case "Out for Delivery":
        return "admin__order-status admin__order-status--delivery";

      case "Delivered":
        return "admin__order-status admin__order-status--delivered";

      case "Cancelled":
        return "admin__order-status admin__order-status--cancelled";

      default:
        return "admin__order-status admin__order-status--pending";
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="admin">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin__sidebar">
        {/* BRAND */}

        <div className="admin__brand">
          <div className="admin__brand-mark">
            S
          </div>

          <div>
            <h1>SHANKAR</h1>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="admin__nav">
          <button
            type="button"
            className={
              activePage === "dashboard"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              changeAdminPage("dashboard")
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            type="button"
            className={
              activePage === "products"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              changeAdminPage("products")
            }
          >
            <span>▣</span>
            Products
          </button>

          <button
            type="button"
            className={
              activePage === "orders"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              changeAdminPage("orders")
            }
          >
            <span>□</span>
            Orders

            {pendingOrders > 0 && (
              <b className="admin__nav-badge">
                {pendingOrders}
              </b>
            )}
          </button>
        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="admin__sidebar-bottom">
          <button
            type="button"
            className="admin__store-button"
            onClick={handleViewStore}
          >
            ← View Store
          </button>

          <button
            type="button"
            className="admin__logout-button"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin__main">
        {/* TOPBAR */}

        <header className="admin__topbar">
          <div>
            <span className="admin__eyebrow">
              SHANKAR BOOK STORE
            </span>

            <h2>
              {activePage === "dashboard" &&
                "Dashboard"}

              {activePage === "products" &&
                "Products"}

              {activePage === "orders" &&
                "Orders"}
            </h2>
          </div>

          <div className="admin__profile">
            <div className="admin__profile-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>

              <span>Store Manager</span>
            </div>
          </div>
        </header>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {activePage === "dashboard" && (
          <section className="admin__content">
            <div className="admin__welcome">
              <div>
                <span>GOOD DAY 👋</span>

                <h1>
                  Welcome to your store.
                </h1>

                <p>
                  Manage your products and
                  orders from one place.
                </p>
              </div>

              <div className="admin__welcome-icon">
                ✦
              </div>
            </div>

            {/* STATS */}

            <div className="admin__stats">
              <div className="admin__stat-card">
                <span className="admin__stat-icon">
                  📦
                </span>

                <div>
                  <p>Total Products</p>

                  <strong>
                    {productList.length}
                  </strong>
                </div>
              </div>

              <div className="admin__stat-card">
                <span className="admin__stat-icon">
                  🏷️
                </span>

                <div>
                  <p>Categories</p>

                  <strong>
                    {categories.length}
                  </strong>
                </div>
              </div>

              <div className="admin__stat-card">
                <span className="admin__stat-icon">
                  🛒
                </span>

                <div>
                  <p>Orders</p>

                  <strong>
                    {totalOrders}
                  </strong>
                </div>
              </div>

              <div className="admin__stat-card">
                <span className="admin__stat-icon">
                  ₹
                </span>

                <div>
                  <p>Revenue</p>

                  <strong>
                    ₹
                    {totalRevenue.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}

            <div className="admin__section-header">
              <div>
                <span>QUICK ACTIONS</span>

                <h2>
                  Manage your store
                </h2>
              </div>
            </div>

            <div className="admin__quick-actions">
              <button
                type="button"
                onClick={() =>
                  changeAdminPage(
                    "products"
                  )
                }
              >
                <span>＋</span>

                <div>
                  <strong>
                    Add Product
                  </strong>

                  <p>
                    Add a new item to your
                    store
                  </p>
                </div>

                <b>→</b>
              </button>

              <button
                type="button"
                onClick={() =>
                  changeAdminPage(
                    "products"
                  )
                }
              >
                <span>▣</span>

                <div>
                  <strong>
                    Manage Products
                  </strong>

                  <p>
                    Edit or remove existing
                    products
                  </p>
                </div>

                <b>→</b>
              </button>

              <button
                type="button"
                onClick={() =>
                  changeAdminPage("orders")
                }
              >
                <span>□</span>

                <div>
                  <strong>
                    View Orders
                  </strong>

                  <p>
                    Check and manage customer
                    orders
                  </p>
                </div>

                <b>→</b>
              </button>
            </div>

            {/* INVENTORY */}

            <div className="admin__overview">
              <div className="admin__section-header">
                <div>
                  <span>INVENTORY</span>

                  <h2>
                    Product Overview
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    changeAdminPage(
                      "products"
                    )
                  }
                >
                  View all →
                </button>
              </div>

              {loading ? (
                <div className="admin__coming-soon">
                  <span>⏳</span>

                  <h2>
                    Loading Products...
                  </h2>

                  <p>
                    Connecting to your
                    database.
                  </p>
                </div>
              ) : (
                <div className="admin__overview-list">
                  {productList
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        className="admin__product-row"
                        key={product._id}
                      >
                        <div className="admin__product-image">
                          {product.image ? (
                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                            />
                          ) : (
                            <span>
                              📦
                            </span>
                          )}
                        </div>

                        <div className="admin__product-info">
                          <strong>
                            {
                              product.name
                            }
                          </strong>

                          <span>
                            {product.type ||
                              product.category}
                          </span>
                        </div>

                        <strong className="admin__product-price">
                          ₹
                          {
                            product.price
                          }
                        </strong>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            PRODUCTS
        =================================================== */}

        {activePage === "products" && (
          <section className="admin__content">
            <AdminProducts
              products={productList}
              onAddProduct={
                handleAddProduct
              }
              onEdit={
                handleEditProduct
              }
              onDelete={
                handleDeleteProduct
              }
            />
          </section>
        )}

        {/* ===================================================
            ORDERS
        =================================================== */}

        {activePage === "orders" && (
          <section className="admin__content">
            <div className="admin__page-intro">
              <div>
                <span>
                  ORDER MANAGEMENT
                </span>

                <h1>Orders</h1>

                <p>
                  View and manage customer
                  orders.
                </p>
              </div>

              <button
                type="button"
                className="admin__refresh-button"
                onClick={loadOrders}
                disabled={ordersLoading}
              >
                {ordersLoading
                  ? "Refreshing..."
                  : "↻ Refresh Orders"}
              </button>
            </div>

            {/* ORDER SUMMARY */}

            <div className="admin__order-summary">
              <div>
                <span>Total Orders</span>
                <strong>
                  {totalOrders}
                </strong>
              </div>

              <div>
                <span>Pending</span>
                <strong>
                  {pendingOrders}
                </strong>
              </div>

              <div>
                <span>Delivered</span>
                <strong>
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Delivered"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Revenue</span>
                <strong>
                  ₹
                  {totalRevenue.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>

            {/* FILTERS */}

            <div className="admin__orders-toolbar">
              <div className="admin__order-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search by customer, mobile, area or order ID..."
                  value={orderSearch}
                  onChange={(event) =>
                    setOrderSearch(
                      event.target.value
                    )
                  }
                />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(event) =>
                  setOrderStatusFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Orders
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            {/* ERROR */}

            {ordersError && (
              <div className="admin__orders-error">
                <strong>
                  Something went wrong
                </strong>

                <p>{ordersError}</p>

                <button
                  type="button"
                  onClick={loadOrders}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* LOADING */}

            {ordersLoading &&
            orders.length === 0 ? (
              <div className="admin__coming-soon">
                <span>⏳</span>

                <h2>
                  Loading Orders...
                </h2>

                <p>
                  Fetching customer orders
                  from database.
                </p>
              </div>
            ) : filteredOrders.length ===
              0 ? (
              <div className="admin__coming-soon">
                <span>
                  {orders.length === 0
                    ? "🛒"
                    : "🔍"}
                </span>

                <h2>
                  {orders.length === 0
                    ? "No Orders Yet"
                    : "No Orders Found"}
                </h2>

                <p>
                  {orders.length === 0
                    ? "Customer orders will appear here once someone places an order."
                    : "Try changing your search or status filter."}
                </p>
              </div>
            ) : (
              <div className="admin__orders-list">
                {filteredOrders.map(
                  (order) => (
                    <article
                      className="admin__order-card"
                      key={order._id}
                    >
                      {/* ORDER HEADER */}

                      <div className="admin__order-header">
                        <div>
                          <span className="admin__order-label">
                            ORDER
                          </span>

                          <strong>
                            #
                            {order._id
                              ?.slice(
                                -8
                              )
                              .toUpperCase()}
                          </strong>

                          <small>
                            {formatDate(
                              order.createdAt
                            )}
                          </small>
                        </div>

                        <div className="admin__order-status-area">
                          <span
                            className={getStatusClass(
                              order.status
                            )}
                          >
                            {order.status ||
                              "Pending"}
                          </span>

                          <select
                            value={
                              order.status ||
                              "Pending"
                            }
                            onChange={(
                              event
                            ) =>
                              handleOrderStatusChange(
                                order._id,
                                event
                                  .target
                                  .value
                              )
                            }
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Out for Delivery">
                              Out for Delivery
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* CUSTOMER */}

                      <div className="admin__order-customer">
                        <div>
                          <span>
                            CUSTOMER
                          </span>

                          <strong>
                            {
                              order
                                .customer
                                ?.name ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            MOBILE
                          </span>

                          <strong>
                            {
                              order
                                .customer
                                ?.mobile ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            AREA
                          </span>

                          <strong>
                            {
                              order
                                .customer
                                ?.area ||
                              "—"
                            }
                          </strong>
                        </div>
                      </div>

                      {/* ADDRESS */}

                      <div className="admin__order-address">
                        <span>
                          DELIVERY ADDRESS
                        </span>

                        <p>
                          {
                            order
                              .customer
                              ?.address ||
                            "—"
                          }
                        </p>
                      </div>

                      {/* PRODUCTS */}

                      <div className="admin__order-products">
                        <div className="admin__order-products-title">
                          <span>
                            PRODUCTS
                          </span>

                          <strong>
                            {
                              order.items
                                ?.reduce(
                                  (
                                    total,
                                    item
                                  ) =>
                                    total +
                                    Number(
                                      item.quantity ||
                                        0
                                    ),
                                  0
                                )
                            }{" "}
                            items
                          </strong>
                        </div>

                        <div className="admin__order-items">
                          {order.items?.map(
                            (
                              item,
                              index
                            ) => (
                              <div
                                className="admin__order-item"
                                key={
                                  item.productId ||
                                  `${order._id}-${index}`
                                }
                              >
                                <div className="admin__order-item-image">
                                  {item.image ? (
                                    <img
                                      src={
                                        item.image
                                      }
                                      alt={
                                        item.name
                                      }
                                    />
                                  ) : (
                                    <span>
                                      📦
                                    </span>
                                  )}
                                </div>

                                <div className="admin__order-item-info">
                                  <strong>
                                    {
                                      item.name
                                    }
                                  </strong>

                                  <span>
                                    ₹
                                    {
                                      item.price
                                    }{" "}
                                    ×{" "}
                                    {
                                      item.quantity
                                    }
                                  </span>
                                </div>

                                <strong>
                                  ₹
                                  {(
                                    Number(
                                      item.price ||
                                        0
                                    ) *
                                    Number(
                                      item.quantity ||
                                        0
                                    )
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </strong>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* ORDER TOTAL */}

                      <div className="admin__order-footer">
                        <div className="admin__order-payment">
                          <span>
                            PAYMENT
                          </span>

                          <strong>
                            💵 COD
                          </strong>
                        </div>

                        <div className="admin__order-totals">
                          <div>
                            <span>
                              Subtotal
                            </span>

                            <strong>
                              ₹
                              {Number(
                                order.subtotal ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Delivery
                            </span>

                            <strong>
                              {Number(
                                order.deliveryCharge ||
                                  0
                              ) === 0
                                ? "FREE"
                                : `₹${Number(
                                    order.deliveryCharge ||
                                      0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}`}
                            </strong>
                          </div>

                          <div className="admin__order-total">
                            <span>
                              Total
                            </span>

                            <strong>
                              ₹
                              {Number(
                                order.total ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="admin__order-actions">
                        <button
                          type="button"
                          className="admin__order-delete"
                          onClick={() =>
                            handleDeleteOrder(
                              order
                            )
                          }
                        >
                          🗑 Delete Order
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
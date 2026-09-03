import { useState } from "react";

import "./Admin.css";

import AdminProducts from "../components/AdminProducts";

import products from "../data/products";
import notebooks from "../data/notebooks";
import pens from "../data/pens";
import resinFrames from "../data/resinFrames";
import photoFrames from "../data/photoFrames";
import keychains from "../data/keychains";

function Admin({ onLogout }) {
  const [activePage, setActivePage] =
    useState("dashboard");

  // ==================================================
  // ALL PRODUCTS
  // ==================================================

  const allProducts = [
    ...products,
    ...notebooks,
    ...pens,
    ...resinFrames,
    ...photoFrames,
    ...keychains,
  ];

  // ==================================================
  // STATS
  // ==================================================

  const categories = [
    ...new Set(
      allProducts
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // ==================================================
  // PRODUCT LIST
  // ==================================================

  const [productList, setProductList] =
    useState(allProducts);

  // ==================================================
  // DELETE PRODUCT
  // ==================================================

  const handleDeleteProduct = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    setProductList((currentProducts) =>
      currentProducts.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.category === product.category
          )
      )
    );
  };

  // ==================================================
  // EDIT PRODUCT
  // ==================================================

  const handleEditProduct = (product) => {
    alert(
      `Edit functionality for "${product.name}" will be added next.`
    );
  };

  // ==================================================
  // ADD PRODUCT
  // ==================================================

  const handleAddProduct = () => {
    alert(
      "Add Product functionality will be added next."
    );
  };

  // ==================================================
  // VIEW STORE
  // ==================================================

  const handleViewStore = () => {
    window.location.href = "/";
  };

  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="admin">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="admin__sidebar">

        {/* ================= LOGO ================= */}

        <div className="admin__brand">

          <div className="admin__brand-mark">
            S
          </div>

          <div>
            <h1>
              SHANKAR
            </h1>

            <span>
              ADMIN PANEL
            </span>
          </div>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="admin__nav">

          {/* Dashboard */}

          <button
            type="button"
            className={
              activePage === "dashboard"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              setActivePage("dashboard")
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          {/* Products */}

          <button
            type="button"
            className={
              activePage === "products"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              setActivePage("products")
            }
          >
            <span>▣</span>
            Products
          </button>

          {/* Orders */}

          <button
            type="button"
            className={
              activePage === "orders"
                ? "admin__nav-item admin__nav-item--active"
                : "admin__nav-item"
            }
            onClick={() =>
              setActivePage("orders")
            }
          >
            <span>□</span>
            Orders
          </button>

        </nav>

        {/* ================= SIDEBAR BOTTOM ================= */}

        <div className="admin__sidebar-bottom">

          {/* View Store */}

          <button
            type="button"
            className="admin__store-button"
            onClick={handleViewStore}
          >
            ← View Store
          </button>

          {/* Logout */}

          <button
            type="button"
            className="admin__logout-button"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="admin__main">

        {/* ================= TOPBAR ================= */}

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

              <strong>
                Administrator
              </strong>

              <span>
                Store Manager
              </span>

            </div>

          </div>

        </header>

        {/* ==================================================
            DASHBOARD
        ================================================== */}

        {activePage === "dashboard" && (

          <section className="admin__content">

            {/* Welcome */}

            <div className="admin__welcome">

              <div>

                <span>
                  GOOD DAY 👋
                </span>

                <h1>
                  Welcome to your store.
                </h1>

                <p>
                  Manage your products and orders
                  from one place.
                </p>

              </div>

              <div className="admin__welcome-icon">
                ✦
              </div>

            </div>

            {/* Stats */}

            <div className="admin__stats">

              <div className="admin__stat-card">

                <span className="admin__stat-icon">
                  📦
                </span>

                <div>

                  <p>
                    Total Products
                  </p>

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

                  <p>
                    Categories
                  </p>

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

                  <p>
                    Orders
                  </p>

                  <strong>
                    0
                  </strong>

                </div>

              </div>

              <div className="admin__stat-card">

                <span className="admin__stat-icon">
                  ₹
                </span>

                <div>

                  <p>
                    Revenue
                  </p>

                  <strong>
                    ₹0
                  </strong>

                </div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="admin__section-header">

              <div>

                <span>
                  QUICK ACTIONS
                </span>

                <h2>
                  Manage your store
                </h2>

              </div>

            </div>

            <div className="admin__quick-actions">

              <button
                type="button"
                onClick={() =>
                  setActivePage("products")
                }
              >

                <span>＋</span>

                <div>

                  <strong>
                    Add Product
                  </strong>

                  <p>
                    Add a new item to your store
                  </p>

                </div>

                <b>→</b>

              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePage("products")
                }
              >

                <span>▣</span>

                <div>

                  <strong>
                    Manage Products
                  </strong>

                  <p>
                    Edit or remove existing products
                  </p>

                </div>

                <b>→</b>

              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePage("orders")
                }
              >

                <span>□</span>

                <div>

                  <strong>
                    View Orders
                  </strong>

                  <p>
                    Check and manage customer orders
                  </p>

                </div>

                <b>→</b>

              </button>

            </div>

            {/* Product Overview */}

            <div className="admin__overview">

              <div className="admin__section-header">

                <div>

                  <span>
                    INVENTORY
                  </span>

                  <h2>
                    Product Overview
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActivePage("products")
                  }
                >
                  View all →
                </button>

              </div>

              <div className="admin__overview-list">

                {productList
                  .slice(0, 5)
                  .map((product) => (

                    <div
                      className="admin__product-row"
                      key={`${product.category}-${product.id}`}
                    >

                      <div className="admin__product-image">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                        ) : (

                          <span>
                            📦
                          </span>

                        )}

                      </div>

                      <div className="admin__product-info">

                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {product.type ||
                            product.category}
                        </span>

                      </div>

                      <strong className="admin__product-price">
                        ₹{product.price}
                      </strong>

                    </div>

                  ))}

              </div>

            </div>

          </section>

        )}

        {/* ==================================================
            PRODUCTS
        ================================================== */}

        {activePage === "products" && (

          <section className="admin__content">

            <AdminProducts
              products={productList}
              onAddProduct={handleAddProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />

          </section>

        )}

        {/* ==================================================
            ORDERS
        ================================================== */}

        {activePage === "orders" && (

          <section className="admin__content">

            <div className="admin__page-intro">

              <div>

                <span>
                  ORDER MANAGEMENT
                </span>

                <h1>
                  Orders
                </h1>

                <p>
                  View and manage customer orders.
                </p>

              </div>

            </div>

            <div className="admin__coming-soon">

              <span>
                🛒
              </span>

              <h2>
                No Orders Yet
              </h2>

              <p>
                Customer orders will appear here
                once the order system is connected.
              </p>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Admin;
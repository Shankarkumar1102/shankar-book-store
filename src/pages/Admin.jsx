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

function Admin({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        throw new Error(
          "Failed to fetch products"
        );
      }

      const data = await response.json();

      if (
        data.length === 0 &&
        localProducts.length > 0
      ) {
        const importResponse = await fetch(
          `${API_URL}/bulk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              localProducts
            ),
          }
        );

        if (!importResponse.ok) {
          throw new Error(
            "Failed to import existing products"
          );
        }

        const importedProducts =
          await importResponse.json();

        setProductList(
          importedProducts
        );
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

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================================================
  // ADMIN BROWSER HISTORY
  // =========================================================

  useEffect(() => {
    const currentState =
      window.history.state;

    if (
      currentState?.page === "admin" &&
      currentState.adminPage
    ) {
      setActivePage(
        currentState.adminPage
      );
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;

      // Admin page navigation
      if (
        state?.page === "admin" &&
        state.adminPage
      ) {
        setActivePage(
          state.adminPage
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // If browser goes back to admin login,
      // App.jsx will handle it.
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

  const handleAddProduct = async (
    newProduct
  ) => {
    try {
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...newProduct,
            price:
              Number(newProduct.price) ||
              0,
            stock:
              Number(newProduct.stock) ||
              0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add product"
        );
      }

      const savedProduct =
        await response.json();

      setProductList(
        (currentProducts) => [
          savedProduct,
          ...currentProducts,
        ]
      );

      alert(
        "Product added successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to add product."
      );
    }
  };

  // =========================================================
  // EDIT PRODUCT
  // =========================================================

  const handleEditProduct = async (
    updatedProduct
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name:
              updatedProduct.name,
            category:
              updatedProduct.category,
            type:
              updatedProduct.type,
            price:
              Number(
                updatedProduct.price
              ) || 0,
            offer:
              updatedProduct.offer,
            size:
              updatedProduct.size,
            color:
              updatedProduct.color,
            description:
              updatedProduct.description,
            image:
              updatedProduct.image,
            stock:
              Number(
                updatedProduct.stock
              ) || 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update product"
        );
      }

      const savedProduct =
        await response.json();

      setProductList(
        (currentProducts) =>
          currentProducts.map(
            (product) =>
              product._id ===
              savedProduct._id
                ? savedProduct
                : product
          )
      );

      alert(
        "Product updated successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update product."
      );
    }
  };

  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  const handleDeleteProduct = async (
    product
  ) => {
    const confirmed =
      window.confirm(
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
        throw new Error(
          "Failed to delete product"
        );
      }

      setProductList(
        (currentProducts) =>
          currentProducts.filter(
            (item) =>
              item._id !==
              product._id
          )
      );

      alert(
        "Product deleted successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete product."
      );
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
    const confirmed =
      window.confirm(
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
              changeAdminPage(
                "dashboard"
              )
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
              changeAdminPage(
                "products"
              )
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
              changeAdminPage(
                "orders"
              )
            }
          >
            <span>□</span>
            Orders
          </button>
        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="admin__sidebar-bottom">
          <button
            type="button"
            className="admin__store-button"
            onClick={
              handleViewStore
            }
          >
            ← View Store
          </button>

          <button
            type="button"
            className="admin__logout-button"
            onClick={
              handleLogout
            }
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
              {activePage ===
                "dashboard" &&
                "Dashboard"}

              {activePage ===
                "products" &&
                "Products"}

              {activePage ===
                "orders" &&
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

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {activePage ===
          "dashboard" && (
          <section className="admin__content">
            <div className="admin__welcome">
              <div>
                <span>
                  GOOD DAY 👋
                </span>

                <h1>
                  Welcome to your store.
                </h1>

                <p>
                  Manage your products
                  and orders from one
                  place.
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
                  <p>
                    Total Products
                  </p>

                  <strong>
                    {
                      productList.length
                    }
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
                    {
                      categories.length
                    }
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
                    0
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
                    ₹0
                  </strong>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}

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
                    Add a new item to
                    your store
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
                    Edit or remove
                    existing products
                  </p>
                </div>

                <b>→</b>
              </button>

              <button
                type="button"
                onClick={() =>
                  changeAdminPage(
                    "orders"
                  )
                }
              >
                <span>□</span>

                <div>
                  <strong>
                    View Orders
                  </strong>

                  <p>
                    Check and manage
                    customer orders
                  </p>
                </div>

                <b>→</b>
              </button>
            </div>

            {/* INVENTORY */}

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
                    .map(
                      (product) => (
                        <div
                          className="admin__product-row"
                          key={
                            product._id
                          }
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
                      )
                    )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            PRODUCTS
        =================================================== */}

        {activePage ===
          "products" && (
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

        {activePage ===
          "orders" && (
          <section className="admin__content">
            <div className="admin__page-intro">
              <div>
                <span>
                  ORDER MANAGEMENT
                </span>

                <h1>Orders</h1>

                <p>
                  View and manage
                  customer orders.
                </p>
              </div>
            </div>

            <div className="admin__coming-soon">
              <span>🛒</span>

              <h2>
                No Orders Yet
              </h2>

              <p>
                Customer orders will
                appear here once the
                order system is
                connected.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
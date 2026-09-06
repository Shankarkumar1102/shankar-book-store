import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import CategoryResults from "./components/CategoryResults";
import ProductSection from "./components/ProductSection";
import OfferBanner from "./components/OfferBanner";
import Footer from "./components/Footer";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import SearchResults from "./components/SearchResults";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

import notebooks from "./data/notebooks";
import pens from "./data/pens";
import keychains from "./data/keychains";
import resinFrames from "./data/resinFrames";
import photoFrames from "./data/photoFrames";
import schoolOffice from "./data/schoolOffice";
import artCraft from "./data/artCraft";
import pencilBoxes from "./data/pencilBoxes";
import bottlesTiffins from "./data/bottlesTiffins";
import otherStationery from "./data/otherStationery";
import giftingItems from "./data/giftingItems";
import trendingProducts from "./data/trendingProducts";

const API_URL =
  "https://shankar-book-store-2.onrender.com/api/products";

function App() {
  const [cart, setCart] = useState([]);

  const [dbProducts, setDbProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductSection, setSelectedProductSection] =
    useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const [adminLogin, setAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setDbProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Product API error:", error);
        setDbProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // =========================================================
  // LOCAL PRODUCTS
  // =========================================================

  const localProducts = [
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
  // WEBSITE PRODUCTS
  // =========================================================

  const websiteProducts =
    dbProducts.length > 0 ? dbProducts : localProducts;

  const allProducts = websiteProducts;

  // =========================================================
  // CATEGORY PRODUCTS
  // =========================================================

  const getCategoryProducts = (category) => {
    return websiteProducts.filter((product) => {
      const productCategory = String(
        product.category || ""
      )
        .trim()
        .toLowerCase();

      const productType = String(product.type || "")
        .trim()
        .toLowerCase();

      const selectedCategoryName = String(category)
        .trim()
        .toLowerCase();

      return (
        productCategory === selectedCategoryName ||
        productType === selectedCategoryName
      );
    });
  };

  // =========================================================
  // TRENDING PRODUCTS
  // =========================================================

  const websiteTrendingProducts =
    dbProducts.length > 0
      ? dbProducts.filter((product) => {
          const category = String(
            product.category || ""
          ).toLowerCase();

          const type = String(
            product.type || ""
          ).toLowerCase();

          const name = String(
            product.name || ""
          ).toLowerCase();

          return (
            category.includes("trending") ||
            type.includes("trending") ||
            name.includes("trending")
          );
        })
      : trendingProducts;

  // =========================================================
  // HOME
  // =========================================================

  const goHome = (addHistory = true) => {
    if (addHistory) {
      window.history.pushState(
        { page: "home" },
        "",
        window.location.pathname
      );
    }

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);
    setAdminLogin(false);
    setIsAdminLoggedIn(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // BROWSER HISTORY
  // =========================================================

  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.page;

      // HOME
      if (!page || page === "home") {
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSearchTerm("");
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setOrderConfirmation(null);
        setAdminLogin(false);
        setIsAdminLoggedIn(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // CATEGORY
      if (page === "category") {
        setSelectedCategory(event.state.category);
        setSelectedProductSection(null);
        setSearchTerm("");
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // SEARCH
      if (page === "search") {
        setSearchTerm(event.state.searchTerm || "");
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // TRENDING / PRODUCT SECTION
      if (page === "product-section") {
        setSelectedProductSection(
          event.state.productSection
        );
        setSelectedCategory(null);
        setSearchTerm("");
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // CART
      if (page === "cart") {
        setIsCartOpen(true);
        setIsCheckoutOpen(false);
        return;
      }

      // CHECKOUT
      if (page === "checkout") {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // ADMIN LOGIN
      if (page === "admin-login") {
        setAdminLogin(true);
        setIsAdminLoggedIn(false);
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSearchTerm("");
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // ADMIN
      if (page === "admin") {
        setIsAdminLoggedIn(true);
        setAdminLogin(false);
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSearchTerm("");
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
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
  // ADD TO CART
  // =========================================================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productId =
        product._id || product.id;

      const existingProduct =
        currentCart.find(
          (item) =>
            (item._id || item.id) === productId
        );

      if (existingProduct) {
        return currentCart.map((item) =>
          (item._id || item.id) === productId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================================================
  // CATEGORY
  // =========================================================

  const openCategory = (category) => {
    const products =
      getCategoryProducts(category);

    const categoryData = {
      name: category,
      products,
    };

    setSelectedCategory(categoryData);
    setSelectedProductSection(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      {
        page: "category",
        category: categoryData,
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearCategory = () => {
    window.history.back();
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (value) => {
    setSearchTerm(value);

    setSelectedCategory(null);
    setSelectedProductSection(null);

    if (value.trim()) {
      window.history.replaceState(
        {
          page: "search",
          searchTerm: value,
        },
        "",
        window.location.pathname
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSearch = () => {
    window.history.back();
  };

  // =========================================================
  // TRENDING
  // =========================================================

  const openTrendingProducts = () => {
    const productSection = {
      title: "Trending Products",
      eyebrow: "WHAT'S POPULAR",
      products: websiteTrendingProducts,
      isTrending: true,
    };

    setSelectedProductSection(
      productSection
    );

    setSelectedCategory(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      {
        page: "product-section",
        productSection,
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearProductSection = () => {
    window.history.back();
  };

  // =========================================================
  // CART
  // =========================================================

  const openCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);

    window.history.pushState(
      { page: "cart" },
      "",
      window.location.pathname
    );
  };

  const closeCart = () => {
    if (window.history.state?.page === "cart") {
      window.history.back();
    } else {
      setIsCartOpen(false);
    }
  };

  // =========================================================
  // CHECKOUT
  // =========================================================

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);

    window.history.pushState(
      { page: "checkout" },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);

    window.history.back();
  };

  // =========================================================
  // PLACE ORDER
  // =========================================================

  const handlePlaceOrder = (customer) => {
    const subtotal = cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

    const area = String(
      customer.area || ""
    )
      .toLowerCase()
      .trim();

    let deliveryCharge = 0;

    if (subtotal < 99) {
      if (area.includes("mahilong")) {
        deliveryCharge = 10;
      } else if (
        area.includes("tatisilwai")
      ) {
        deliveryCharge = 20;
      } else if (
        area.includes("namkum")
      ) {
        deliveryCharge = 30;
      }
    }

    const totalAmount =
      subtotal + deliveryCharge;

    const newOrderId =
      "SB" +
      Date.now()
        .toString()
        .slice(-6);

    const orderItems = cart
      .map(
        (item) =>
          `• ${item.name} x ${
            item.quantity
          } = ₹${
            Number(item.price || 0) *
            Number(item.quantity || 0)
          }`
      )
      .join("\n");

    const message = `
🛍️ *NEW ORDER - SHANKAR BOOK STORE*

📋 *Order ID:* #${newOrderId}

👤 *CUSTOMER DETAILS*

Name: ${customer.name}
Mobile: ${customer.phone}

📍 *DELIVERY DETAILS*

Area: ${customer.area}
Address: ${customer.address}

🛒 *ORDER ITEMS*

${orderItems}

💰 *SUBTOTAL:* ₹${subtotal}

🚚 *DELIVERY CHARGE:* ${
      deliveryCharge === 0
        ? "FREE"
        : `₹${deliveryCharge}`
    }

💰 *TOTAL AMOUNT:* ₹${totalAmount}

💵 Payment: Cash on Delivery

Thank you!
`;

    const whatsappURL =
      `https://wa.me/916239901052?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappURL,
      "_blank"
    );

    setOrderConfirmation({
      customer,
      cart,
      subtotal,
      deliveryCharge,
      totalAmount,
      orderId: newOrderId,
    });

    setCart([]);

    setIsCheckoutOpen(false);

    window.history.pushState(
      { page: "order-confirmation" },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CONTINUE SHOPPING
  // =========================================================

  const continueShopping = () => {
    goHome(true);
  };

  // =========================================================
  // ADMIN LOGIN
  // =========================================================

  const openAdminLogin = () => {
    setAdminLogin(true);
    setIsAdminLoggedIn(false);

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      { page: "admin-login" },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADMIN LOGIN SUCCESS
  // =========================================================

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setAdminLogin(false);

    window.history.pushState(
      { page: "admin" },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADMIN LOGOUT
  // =========================================================

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminLogin(false);

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      { page: "home" },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADMIN
  // =========================================================

  if (isAdminLoggedIn) {
    return (
      <Admin
        onLogout={handleAdminLogout}
      />
    );
  }

  if (adminLogin) {
    return (
      <AdminLogin
        onLogin={handleAdminLogin}
      />
    );
  }

  // =========================================================
  // ORDER CONFIRMATION
  // =========================================================

  if (orderConfirmation) {
    return (
      <OrderConfirmation
        customer={
          orderConfirmation.customer
        }
        cart={orderConfirmation.cart}
        totalAmount={
          orderConfirmation.totalAmount
        }
        orderId={
          orderConfirmation.orderId
        }
        onContinueShopping={
          continueShopping
        }
      />
    );
  }

  // =========================================================
  // CHECKOUT
  // =========================================================

  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={backToCart}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  // =========================================================
  // SEARCH RESULTS
  // =========================================================

  if (searchTerm.trim()) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={() => goHome(true)}
        />

        <SearchResults
          searchTerm={searchTerm}
          addToCart={addToCart}
          onClearSearch={clearSearch}
          products={allProducts}
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={closeCart}
          onCheckout={openCheckout}
        />
      </div>
    );
  }

  // =========================================================
  // CATEGORY RESULTS
  // =========================================================

  if (selectedCategory) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={() => goHome(true)}
        />

        <CategoryResults
          category={
            selectedCategory.name
          }
          products={
            selectedCategory.products
          }
          addToCart={addToCart}
          onClearCategory={
            clearCategory
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={closeCart}
          onCheckout={openCheckout}
        />
      </div>
    );
  }

  // =========================================================
  // PRODUCT SECTION RESULTS
  // =========================================================

  if (selectedProductSection) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={() => goHome(true)}
        />

        <CategoryResults
          category={
            selectedProductSection.title
          }
          products={
            selectedProductSection.products
          }
          addToCart={addToCart}
          onClearCategory={
            clearProductSection
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={closeCart}
          onCheckout={openCheckout}
        />
      </div>
    );
  }

  // =========================================================
  // HOME
  // =========================================================

  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={openCart}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onHomeClick={() => goHome(true)}
      />

      <Hero />

      <CategorySection
        onCategoryClick={openCategory}
      />

      {productsLoading ? (
        <div
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading products...
        </div>
      ) : (
        <>
          <ProductSection
            title="Trending Products"
            eyebrow="WHAT'S POPULAR"
            products={
              websiteTrendingProducts
            }
            onAddToCart={addToCart}
            onViewAll={
              openTrendingProducts
            }
          />

          <ProductSection
            title="Frames"
            eyebrow="SPECIAL MOMENTS"
            products={websiteProducts.filter(
              (product) => {
                const category =
                  String(
                    product.category || ""
                  ).toLowerCase();

                return (
                  category ===
                    "photo frames" ||
                  category ===
                    "resin frames"
                );
              }
            )}
            onAddToCart={addToCart}
          />

          <ProductSection
            title="Water Bottles"
            eyebrow="EVERYDAY ESSENTIALS"
            products={websiteProducts.filter(
              (product) => {
                const category =
                  String(
                    product.category || ""
                  ).toLowerCase();

                return (
                  category ===
                    "bottles & tiffins" ||
                  category.includes(
                    "bottle"
                  )
                );
              }
            )}
            onAddToCart={addToCart}
          />

          <ProductSection
            title="Notebooks"
            eyebrow="WRITE IT DOWN"
            products={websiteProducts.filter(
              (product) =>
                String(
                  product.category || ""
                ).toLowerCase() ===
                "notebooks"
            )}
            onAddToCart={addToCart}
          />

          <ProductSection
            title="Pens & Writing"
            eyebrow="WRITE WITH STYLE"
            products={websiteProducts.filter(
              (product) =>
                String(
                  product.category || ""
                ).toLowerCase() ===
                "pens & writing"
            )}
            onAddToCart={addToCart}
          />

          <ProductSection
            title="Keychains"
            eyebrow="SMALL & STYLISH"
            products={websiteProducts.filter(
              (product) =>
                String(
                  product.category || ""
                ).toLowerCase() ===
                "keychains"
            )}
            onAddToCart={addToCart}
          />
        </>
      )}

      <OfferBanner />

      <Footer
        onAdminLogin={openAdminLogin}
      />

      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={openCheckout}
      />
    </div>
  );
}

export default App;
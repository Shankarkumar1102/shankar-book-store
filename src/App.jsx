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
  // LOAD PRODUCTS FROM MONGODB / RENDER
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
  // OLD LOCAL PRODUCTS
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
  // PRODUCTS USED BY WEBSITE
  // =========================================================
  //
  // If MongoDB has products, use MongoDB products.
  // Otherwise use existing local products.
  //
  // This keeps the website working while we migrate everything.
  // =========================================================

  const websiteProducts =
    dbProducts.length > 0 ? dbProducts : localProducts;

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
  // ALL PRODUCTS
  // =========================================================

  const allProducts = websiteProducts;

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
  // CART
  // =========================================================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productId = product._id || product.id;

      const existingProduct = currentCart.find(
        (item) => (item._id || item.id) === productId
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
    const products = getCategoryProducts(category);

    setSelectedCategory({
      name: category,
      products,
    });

    setSelectedProductSection(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearCategory = () => {
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (value) => {
    setSearchTerm(value);

    setSelectedCategory(null);
    setSelectedProductSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSearch = () => {
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // TRENDING
  // =========================================================

  const openTrendingProducts = () => {
    setSelectedProductSection({
      title: "Trending Products",
      eyebrow: "WHAT'S POPULAR",
      products: websiteTrendingProducts,
      isTrending: true,
    });

    setSelectedCategory(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearProductSection = () => {
    setSelectedProductSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CART / CHECKOUT
  // =========================================================

  const openCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
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

    const area = String(customer.area || "")
      .toLowerCase()
      .trim();

    let deliveryCharge = 0;

    if (subtotal < 99) {
      if (area.includes("mahilong")) {
        deliveryCharge = 10;
      } else if (area.includes("tatisilwai")) {
        deliveryCharge = 20;
      } else if (area.includes("namkum")) {
        deliveryCharge = 30;
      }
    }

    const totalAmount =
      subtotal + deliveryCharge;

    const newOrderId =
      "SB" + Date.now().toString().slice(-6);

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CONTINUE SHOPPING
  // =========================================================

  const continueShopping = () => {
    setOrderConfirmation(null);

    setSelectedCategory(null);

    setSelectedProductSection(null);

    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADMIN
  // =========================================================

  const openAdminLogin = () => {
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
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setAdminLogin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminLogin(false);

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADMIN LOGIN PAGE
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
        customer={orderConfirmation.customer}
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
        />

        <CategoryResults
          category={selectedCategory.name}
          products={selectedCategory.products}
          addToCart={addToCart}
          onClearCategory={clearCategory}
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
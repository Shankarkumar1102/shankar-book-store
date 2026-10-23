import { useState, useEffect } from "react";

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

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductSection, setSelectedProductSection] =
    useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [adminLogin, setAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // BROWSER BACK / FORWARD NAVIGATION
  useEffect(() => {
    if (!window.history.state?.givuPage) {
      window.history.replaceState(
        { givuPage: "home" },
        "",
        window.location.href
      );
    }

    const handlePopState = (event) => {
      const state = event.state || {};
      const page = state.givuPage || "home";

      setSelectedProduct(null);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);

      if (page === "search") {
        setSearchTerm(state.searchTerm || "");
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setOrderConfirmation(null);
      } else if (page === "category") {
        setSearchTerm("");
        setSelectedCategory(state.category || null);
        setSelectedProductSection(null);
        setOrderConfirmation(null);
      } else if (page === "product-section") {
        setSearchTerm("");
        setSelectedCategory(null);
        setSelectedProductSection(state.productSection || null);
        setOrderConfirmation(null);
      } else if (page === "product-details") {
        setSelectedProduct(state.product || null);
        setSearchTerm(state.searchTerm || "");
        setSelectedCategory(state.category || null);
        setSelectedProductSection(state.productSection || null);
        setOrderConfirmation(null);
      } else if (page === "cart") {
        setSearchTerm(state.searchTerm || "");
        setSelectedCategory(state.category || null);
        setSelectedProductSection(state.productSection || null);
        setIsCartOpen(true);
        setOrderConfirmation(null);
      } else if (page === "checkout") {
        setSearchTerm(state.searchTerm || "");
        setSelectedCategory(state.category || null);
        setSelectedProductSection(state.productSection || null);
        setIsCheckoutOpen(true);
        setOrderConfirmation(null);
      } else if (page === "order-confirmation") {
        setOrderConfirmation(state.orderConfirmation || null);
        setSearchTerm("");
        setSelectedCategory(null);
        setSelectedProductSection(null);
      } else {
        setSearchTerm("");
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSelectedProduct(null);
        setOrderConfirmation(null);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Save the current screen before opening another screen.
  const saveCurrentScreen = () => {
    if (searchTerm.trim()) return { searchTerm, category: null, productSection: null };
    if (selectedCategory) return { searchTerm: "", category: selectedCategory, productSection: null };
    if (selectedProductSection) return { searchTerm: "", category: null, productSection: selectedProductSection };
    return { searchTerm: "", category: null, productSection: null };
  };

  const navigateTo = (state) => {
    window.history.pushState(state, "", window.location.href);
  };

  // ALL PRODUCTS
  const allProducts = [
    ...giftingItems,
    ...keychains,
    ...pens,
    ...otherStationery,
    ...artCraft,
    ...photoFrames,
    ...resinFrames,
    ...notebooks,
    ...pencilBoxes,
    ...schoolOffice,
    ...bottlesTiffins,
  ];

  // CATEGORY MAPPING
  const categoryProducts = {
    "Cute Gifts": giftingItems,
    Keychains: keychains,
    Stationery: [...pens, ...otherStationery],
    "Art & Craft": artCraft,
    "Photo Frames": photoFrames,
    "Resin Frames": resinFrames,
    "Diary & Notebooks": notebooks,
    "All Products": allProducts,
  };

  // ADD TO CART
  const addToCart = (product) => {
    if (!product) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) =>
          String(item.id ?? item._id) ===
          String(product.id ?? product._id)
      );

      if (existingProduct) {
        // Quantity selection is disabled: keep one of each product in the cart.
        return currentCart;
      }

      return [
        ...currentCart,
        {
          ...product,
          id: product.id ?? product._id,
          quantity: 1,
        },
      ];
    });
  };

  // OPEN PRODUCT DETAILS POPUP
  const handleProductClick = (product) => {
    if (!product) return;
    navigateTo({ givuPage: "product-details", product, ...saveCurrentScreen() });
    setSelectedProduct(product);
  };

  // CLOSE PRODUCT DETAILS POPUP
  const closeProductDetails = () => {
    if (window.history.state?.givuPage === "product-details") {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };

  // OPEN CATEGORY
  const openCategory = (category) => {
    const products = categoryProducts[category] || [];
    const categoryData = {
      name: category,
      products,
      isAll: category === "All Products",
    };

    navigateTo({ givuPage: "category", category: categoryData });
    setSelectedCategory(categoryData);

    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CLEAR CATEGORY
  const clearCategory = () => {
    if (window.history.state?.givuPage === "category") {
      window.history.back();
      return;
    }
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // OPEN ALL CATEGORIES
  const openAllCategories = () => {
    const categoryData = {
      name: "All Products",
      products: allProducts,
      isAll: true,
    };
    navigateTo({ givuPage: "category", category: categoryData });
    setSelectedCategory(categoryData);

    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SEARCH
  const handleSearch = (value) => {
    if (value.trim() && !searchTerm.trim()) {
      navigateTo({ givuPage: "search", searchTerm: value });
    } else if (value.trim() && window.history.state?.givuPage === "search") {
      window.history.replaceState(
        { givuPage: "search", searchTerm: value },
        "",
        window.location.href
      );
    }

    setSearchTerm(value);
    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CLEAR SEARCH
  const clearSearch = () => {
    if (window.history.state?.givuPage === "search") {
      window.history.back();
      return;
    }
    setSearchTerm("");
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // OPEN PRODUCT SECTION
  const openProductSection = (section) => {
    navigateTo({ givuPage: "product-section", productSection: section });
    setSelectedProductSection(section);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSearchTerm("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CLEAR PRODUCT SECTION
  const clearProductSection = () => {
    if (window.history.state?.givuPage === "product-section") {
      window.history.back();
      return;
    }
    setSelectedProductSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // HOME CLICK
  const handleHomeClick = () => {
    navigateTo({ givuPage: "home" });
    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CART
  const openCart = () => {
    if (!isCartOpen) {
      navigateTo({ givuPage: "cart", ...saveCurrentScreen() });
    }
    setSelectedProduct(null);
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
  };

  const closeCart = () => {
    if (window.history.state?.givuPage === "cart") {
      window.history.back();
      return;
    }
    setIsCartOpen(false);
  };

  // CHECKOUT
  const openCheckout = () => {
    navigateTo({ givuPage: "checkout", ...saveCurrentScreen() });
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToCart = () => {
    if (window.history.state?.givuPage === "checkout") {
      window.history.back();
      return;
    }
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  // PLACE ORDER
  const handlePlaceOrder = (customer) => {
    const subtotal = cart.reduce(
      (total, item) =>
        total + Number(item.price || 0),
      0
    );

    // Delivery charge applies only when subtotal is below ₹99.
    let deliveryCharge = 0;

    if (subtotal < 99) {
      const area = String(customer.area || "")
        .toLowerCase()
        .trim();

      if (area === "mahilong") {
        deliveryCharge = 10;
      } else if (area === "tatisilwai") {
        deliveryCharge = 20;
      } else if (area === "namkum") {
        deliveryCharge = 30;
      }
    }

    const totalAmount = subtotal + deliveryCharge;

    const newOrderId = "GV" + Date.now().toString().slice(-6);

    const orderItems = cart
      .map(
        (item) =>
          `• ${item.name} = ₹${Number(item.price || 0)}`
      )
      .join("\n");

    const message = `
🎁 *NEW ORDER - GIVU*

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
      deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`
    }

💰 *TOTAL AMOUNT:* ₹${totalAmount}

💵 Payment: Cash on Delivery

Thank you for shopping with GIVU! ❤️
`;

    const whatsappURL = `https://wa.me/916239901052?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    const confirmationData = {
      customer,
      cart: [...cart],
      subtotal,
      deliveryCharge,
      totalAmount,
      orderId: newOrderId,
    };

    navigateTo({
      givuPage: "order-confirmation",
      orderConfirmation: confirmationData,
    });
    setOrderConfirmation(confirmationData);

    setCart([]);
    setIsCheckoutOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CONTINUE SHOPPING
  const continueShopping = () => {
    navigateTo({ givuPage: "home" });
    setOrderConfirmation(null);
    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ADMIN LOGIN
  const openAdminLogin = () => {
    setAdminLogin(true);
    setIsAdminLoggedIn(false);
    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);
    navigateTo({ givuPage: "admin-login" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setAdminLogin(false);
    navigateTo({ givuPage: "admin" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminLogin(false);
    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);
    navigateTo({ givuPage: "home" });
  };

  // Footer component's existing Admin Login text/button opens the login screen.
  const handleFooterClick = (event) => {
    const clickedElement = event.target.closest("button, a");
    if (
      clickedElement &&
      clickedElement.textContent.trim().toLowerCase().includes("admin login")
    ) {
      event.preventDefault();
      event.stopPropagation();
      openAdminLogin();
    }
  };

  // ADMIN SCREENS
  if (isAdminLoggedIn) {
    return <Admin onLogout={handleAdminLogout} />;
  }

  if (adminLogin) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // PRODUCT DETAILS POPUP
  const productDetailsModal = selectedProduct && (
    <div
      className="giv-product-modal-overlay"
      onClick={closeProductDetails}
    >
      <section
        className="giv-product-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${selectedProduct.name} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="giv-product-modal__close"
          onClick={closeProductDetails}
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="giv-product-modal__image">
          {selectedProduct.image ? (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name || "GIVU product"}
            />
          ) : (
            <span>📦</span>
          )}
        </div>

        <div className="giv-product-modal__content">
          <span className="giv-product-modal__category">
            {selectedProduct.type ||
              selectedProduct.category ||
              "GIVU"}
          </span>

          <h2>{selectedProduct.name}</h2>

          <strong className="giv-product-modal__price">
            ₹{selectedProduct.price}
          </strong>

          {selectedProduct.pages && (
            <p>
              <b>Pages:</b> {selectedProduct.pages}
            </p>
          )}

          {selectedProduct.pattern && (
            <p>
              <b>Pattern:</b> {selectedProduct.pattern}
            </p>
          )}

          {selectedProduct.color && (
            <p>
              <b>Colour:</b> {selectedProduct.color}
            </p>
          )}

          <p className="giv-product-modal__description">
            {selectedProduct.description ||
              "A cute and thoughtful product from GIVU."}
          </p>

          <button
            type="button"
            className="giv-product-modal__add"
            onClick={() => {
              addToCart(selectedProduct);
              closeProductDetails();
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </section>
    </div>
  );

  // ORDER CONFIRMATION
  if (orderConfirmation) {
    return (
      <OrderConfirmation
        customer={orderConfirmation.customer}
        cart={orderConfirmation.cart}
        totalAmount={orderConfirmation.totalAmount}
        orderId={orderConfirmation.orderId}
        onContinueShopping={continueShopping}
      />
    );
  }

  // CHECKOUT PAGE
  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={backToCart}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  // SHARED CART
  const cartElement = (
    <Cart
      cart={cart}
      setCart={setCart}
      isOpen={isCartOpen}
      onClose={closeCart}
      onCheckout={openCheckout}
    />
  );

  // SEARCH RESULTS
  if (searchTerm.trim()) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={handleHomeClick}
        />

        <SearchResults
          searchTerm={searchTerm}
          products={allProducts}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
          onClearSearch={clearSearch}
        />

        {productDetailsModal}
        {cartElement}
      </div>
    );
  }

  // CATEGORY RESULTS
  if (selectedCategory) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={handleHomeClick}
        />

        <CategoryResults
          category={selectedCategory.name}
          products={selectedCategory.products}
          addToCart={addToCart}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
          onClearCategory={clearCategory}
        />

        {productDetailsModal}
        {cartElement}
      </div>
    );
  }

  // PRODUCT SECTION
  if (selectedProductSection) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onHomeClick={handleHomeClick}
        />

        <main
          style={{
            minHeight: "100vh",
            padding: "40px 6%",
            backgroundColor: "var(--color-cream)",
          }}
        >
          <button
            type="button"
            onClick={clearProductSection}
            style={{
              marginBottom: "25px",
              padding: "10px 16px",
              border: "1px solid var(--color-light-border)",
              borderRadius: "10px",
              background: "var(--color-white)",
              color: "var(--color-plum)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>

          <ProductSection
            title={selectedProductSection.title}
            eyebrow={selectedProductSection.eyebrow}
            products={selectedProductSection.products}
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
          />
        </main>

        {productDetailsModal}
        {cartElement}
      </div>
    );
  }

  // HOME PAGE
  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={openCart}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onHomeClick={handleHomeClick}
      />

      <Hero />

      <CategorySection
        onCategoryClick={openCategory}
        onViewAll={openAllCategories}
      />

      <ProductSection
        title="Trending Products"
        eyebrow="WHAT'S POPULAR"
        products={[
          ...giftingItems,
          ...keychains,
          ...photoFrames,
          ...resinFrames,
          ...artCraft,
          ...pencilBoxes,
        ]}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
        onViewAll={() =>
          openProductSection({
            title: "Trending Products",
            eyebrow: "WHAT'S POPULAR",
            products: [
              ...giftingItems,
              ...keychains,
              ...photoFrames,
              ...resinFrames,
              ...artCraft,
              ...pencilBoxes,
            ],
          })
        }
      />

      <ProductSection
        title="Frames"
        eyebrow="SPECIAL MOMENTS"
        products={[...photoFrames, ...resinFrames]}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
      />

      <ProductSection
        title="Art & Craft"
        eyebrow="CREATE SOMETHING SPECIAL"
        products={artCraft}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
      />

      <ProductSection
        title="Stationery"
        eyebrow="WRITE WITH STYLE"
        products={[...pens, ...otherStationery]}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
      />

      <ProductSection
        title="Diary & Notebooks"
        eyebrow="WRITE IT DOWN"
        products={notebooks}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
      />

      <OfferBanner />
      <div onClick={handleFooterClick}><Footer /></div>

      {productDetailsModal}
      {cartElement}
    </div>
  );
}

export default App;
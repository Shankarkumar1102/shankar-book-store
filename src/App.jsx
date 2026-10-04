import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductSection, setSelectedProductSection] =
    useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);
  const [orderConfirmation, setOrderConfirmation] =
    useState(null);

  /* =====================================================
     ALL PRODUCTS
  ===================================================== */

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

  /* =====================================================
     GIVU CATEGORY MAPPING

     CATEGORY ORDER:
     1. Cute Gifts
     2. Keychains
     3. Stationery
     4. Art & Craft
     5. Photo Frames
     6. Resin Frames
     7. Diary & Notebooks
     8. All Products
  ===================================================== */

  const categoryProducts = {
    "Cute Gifts": giftingItems,

    Keychains: keychains,

    Stationery: [
      ...pens,
      ...otherStationery,
    ],

    "Art & Craft": artCraft,

    "Photo Frames": photoFrames,

    "Resin Frames": resinFrames,

    "Diary & Notebooks": notebooks,

    "All Products": allProducts,
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
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

  /* =====================================================
     OPEN CATEGORY
  ===================================================== */

  const openCategory = (category) => {
    const products =
      categoryProducts[category] || [];

    setSelectedCategory({
      name: category,
      products: products,
      isAll: category === "All Products",
    });

    setSelectedProductSection(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CLEAR CATEGORY
  ===================================================== */

  const clearCategory = () => {
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     OPEN ALL CATEGORIES
  ===================================================== */

  const openAllCategories = () => {
    setSelectedCategory({
      name: "All Products",
      products: allProducts,
      isAll: true,
    });

    setSelectedProductSection(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSelectedCategory(null);
    setSelectedProductSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CLEAR SEARCH
  ===================================================== */

  const clearSearch = () => {
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     OPEN PRODUCT SECTION
  ===================================================== */

  const openProductSection = (section) => {
    setSelectedProductSection(section);
    setSelectedCategory(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CLEAR PRODUCT SECTION
  ===================================================== */

  const clearProductSection = () => {
    setSelectedProductSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CART
  ===================================================== */

  const openCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  /* =====================================================
     CHECKOUT
  ===================================================== */

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

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = (customer) => {
    const subtotal = cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    let deliveryCharge = 0;

    if (subtotal > 99) {
      const area = String(
        customer.area || ""
      )
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

    const totalAmount =
      subtotal + deliveryCharge;

    const newOrderId =
      "GV" +
      Date.now()
        .toString()
        .slice(-6);

    const orderItems = cart
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
          }`
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
      deliveryCharge === 0
        ? "FREE"
        : `₹${deliveryCharge}`
    }

💰 *TOTAL AMOUNT:* ₹${totalAmount}

💵 Payment: Cash on Delivery

Thank you for shopping with GIVU! ❤️
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

  /* =====================================================
     CONTINUE SHOPPING
  ===================================================== */

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

  /* =====================================================
     ORDER CONFIRMATION
  ===================================================== */

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

  /* =====================================================
     CHECKOUT PAGE
  ===================================================== */

  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={backToCart}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  /* =====================================================
     SEARCH RESULTS
  ===================================================== */

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

  /* =====================================================
     CATEGORY RESULTS
  ===================================================== */

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

  /* =====================================================
     PRODUCT SECTION
  ===================================================== */

  if (selectedProductSection) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={openCart}
          onSearch={handleSearch}
          searchTerm={searchTerm}
        />

        <main
          style={{
            minHeight: "100vh",
            padding: "40px 6%",
            backgroundColor:
              "var(--color-cream)",
          }}
        >
          <button
            type="button"
            onClick={
              clearProductSection
            }
            style={{
              marginBottom: "25px",
              padding: "10px 16px",
              border:
                "1px solid var(--color-light-border)",
              borderRadius: "10px",
              background:
                "var(--color-white)",
              color:
                "var(--color-plum)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>

          <ProductSection
            title={
              selectedProductSection.title
            }
            eyebrow={
              selectedProductSection.eyebrow
            }
            products={
              selectedProductSection.products
            }
            onAddToCart={addToCart}
            onViewAll={() => {}}
          />
        </main>

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

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={openCart}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <Hero />

      {/* ==================================================
          GIVU CATEGORIES
      ================================================== */}

      <CategorySection
        onCategoryClick={
          openCategory
        }
        onViewAll={
          openAllCategories
        }
      />

      {/* ==================================================
          TRENDING PRODUCTS
      ================================================== */}

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
        onAddToCart={
          addToCart
        }
        onViewAll={() =>
          openProductSection({
            title:
              "Trending Products",
            eyebrow:
              "WHAT'S POPULAR",
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

      {/* ==================================================
          FRAMES
      ================================================== */}

      <ProductSection
        title="Frames"
        eyebrow="SPECIAL MOMENTS"
        products={[
          ...photoFrames,
          ...resinFrames,
        ]}
        onAddToCart={
          addToCart
        }
        onViewAll={() =>
          openProductSection({
            title: "Frames",
            eyebrow:
              "SPECIAL MOMENTS",
            products: [
              ...photoFrames,
              ...resinFrames,
            ],
          })
        }
      />

      {/* ==================================================
          ART & CRAFT
      ================================================== */}

      <ProductSection
        title="Art & Craft"
        eyebrow="CREATE SOMETHING SPECIAL"
        products={artCraft}
        onAddToCart={
          addToCart
        }
        onViewAll={() =>
          openProductSection({
            title:
              "Art & Craft",
            eyebrow:
              "CREATE SOMETHING SPECIAL",
            products:
              artCraft,
          })
        }
      />

      {/* ==================================================
          STATIONERY
      ================================================== */}

      <ProductSection
        title="Stationery"
        eyebrow="WRITE WITH STYLE"
        products={[
          ...pens,
          ...otherStationery,
        ]}
        onAddToCart={
          addToCart
        }
        onViewAll={() =>
          openProductSection({
            title:
              "Stationery",
            eyebrow:
              "WRITE WITH STYLE",
            products: [
              ...pens,
              ...otherStationery,
            ],
          })
        }
      />

      {/* ==================================================
          DIARY & NOTEBOOKS
      ================================================== */}

      <ProductSection
        title="Diary & Notebooks"
        eyebrow="WRITE IT DOWN"
        products={notebooks}
        onAddToCart={
          addToCart
        }
        onViewAll={() =>
          openProductSection({
            title:
              "Diary & Notebooks",
            eyebrow:
              "WRITE IT DOWN",
            products:
              notebooks,
          })
        }
      />

      {/* ==================================================
          GIVU SECTIONS
      ================================================== */}

      <OfferBanner />

      <Footer />

      {/* ==================================================
          CART
      ================================================== */}

      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={
          openCheckout
        }
      />
    </div>
  );
}

export default App;

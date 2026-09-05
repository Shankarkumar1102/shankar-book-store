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

// 🔥 TRENDING PRODUCTS
import trendingProducts from "./data/trendingProducts";

function App() {
  const [cart, setCart] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedProductSection, setSelectedProductSection] =
    useState(null);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  const [orderConfirmation, setOrderConfirmation] =
    useState(null);

  /* ==================================================
     CATEGORY PRODUCTS
  ================================================== */

  const categoryProducts = {
    Notebooks: notebooks,

    "Pens & Writing": pens,

    "School & Office": schoolOffice,

    "Art & Craft": artCraft,

    "Pencil Boxes": pencilBoxes,

    "Bottles & Tiffins": bottlesTiffins,

    Keychains: keychains,

    "Other Stationery": otherStationery,

    "Gifting Items": giftingItems,

    "Photo Frames": photoFrames,

    "Resin Frames": resinFrames,
  };

  /* ==================================================
     ALL PRODUCTS
  ================================================== */

  const allProducts = [
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
  ];

  /* ==================================================
     ADD TO CART
  ================================================== */

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

  /* ==================================================
     OPEN CATEGORY
  ================================================== */

  const openCategory = (category) => {
    const products =
      categoryProducts[category] || [];

    setSelectedCategory({
      name: category,
      products: products,
    });

    setSelectedProductSection(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==================================================
     CLEAR CATEGORY
  ================================================== */

  const clearCategory = () => {
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==================================================
     SEARCH
  ================================================== */

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

  /* ==================================================
     TRENDING VIEW ALL
  ================================================== */

  const openTrendingProducts = () => {
    setSelectedProductSection({
      title: "Trending Products",
      eyebrow: "WHAT'S POPULAR",
      products: trendingProducts,
      isTrending: true,
    });

    setSelectedCategory(null);
    setSearchTerm("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==================================================
     CLEAR PRODUCT SECTION
  ================================================== */

  const clearProductSection = () => {
    setSelectedProductSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==================================================
     CART
  ================================================== */

  const openCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  /* ==================================================
     CHECKOUT
  ================================================== */

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

  /* ==================================================
     PLACE ORDER
  ================================================== */

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

    /*
      ₹99 OR ABOVE = FREE DELIVERY

      BELOW ₹99:
      Mahilong = ₹10
      Tatisilwai = ₹20
      Namkum = ₹30
    */

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

    /* ==================================================
       ORDER ID
    ================================================== */

    const newOrderId =
      "SB" +
      Date.now()
        .toString()
        .slice(-6);

    /* ==================================================
       ORDER ITEMS
    ================================================== */

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

    /* ==================================================
       WHATSAPP MESSAGE
    ================================================== */

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

    /* ==================================================
       WHATSAPP
    ================================================== */

    const whatsappURL =
      `https://wa.me/916239901052?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappURL,
      "_blank"
    );

    /* ==================================================
       ORDER CONFIRMATION
    ================================================== */

    setOrderConfirmation({
      customer,
      cart,
      subtotal,
      deliveryCharge,
      totalAmount,
      orderId: newOrderId,
    });

    /* ==================================================
       CLEAR CART
    ================================================== */

    setCart([]);

    setIsCheckoutOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==================================================
     CONTINUE SHOPPING
  ================================================== */

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

  /* ==================================================
     ORDER CONFIRMATION PAGE
  ================================================== */

  if (orderConfirmation) {
    return (
      <OrderConfirmation
        customer={
          orderConfirmation.customer
        }
        cart={
          orderConfirmation.cart
        }
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

  /* ==================================================
     CHECKOUT PAGE
  ================================================== */

  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={backToCart}
        onPlaceOrder={
          handlePlaceOrder
        }
      />
    );
  }

  /* ==================================================
     SEARCH RESULTS
  ================================================== */

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
          onClearSearch={
            clearSearch
          }
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

  /* ==================================================
     CATEGORY RESULTS
  ================================================== */

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

  /* ==================================================
     TRENDING PRODUCTS PAGE
  ================================================== */

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

  /* ==================================================
     HOME PAGE
  ================================================== */

  return (
    <div>
      {/* NAVBAR */}

      <Navbar
        cart={cart}
        onCartClick={openCart}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      {/* HERO */}

      <Hero />

      {/* ==================================================
         CATEGORIES
      ================================================== */}

      <CategorySection
        onCategoryClick={
          openCategory
        }
        onViewAll={() => {
          // View All Categories disabled
        }}
      />

      {/* ==================================================
         TRENDING PRODUCTS
         ONLY SECTION WITH VIEW ALL
      ================================================== */}

      <ProductSection
        title="Trending Products"
        eyebrow="WHAT'S POPULAR"
        products={trendingProducts}
        onAddToCart={addToCart}
        onViewAll={
          openTrendingProducts
        }
      />

      {/* ==================================================
         FRAMES
         NO VIEW ALL
      ================================================== */}

      <ProductSection
        title="Frames"
        eyebrow="SPECIAL MOMENTS"
        products={[
          ...photoFrames,
          ...resinFrames,
        ]}
        onAddToCart={addToCart}
        onViewAll={() => {}}
      />

      {/* ==================================================
         WATER BOTTLES
         NO VIEW ALL
      ================================================== */}

      <ProductSection
        title="Water Bottles"
        eyebrow="EVERYDAY ESSENTIALS"
        products={
          bottlesTiffins
        }
        onAddToCart={addToCart}
        onViewAll={() => {}}
      />

      {/* ==================================================
         NOTEBOOKS
         NO VIEW ALL
      ================================================== */}

      <ProductSection
        title="Notebooks"
        eyebrow="WRITE IT DOWN"
        products={notebooks}
        onAddToCart={addToCart}
        onViewAll={() => {}}
      />

      {/* ==================================================
         PENS & WRITING
         NO VIEW ALL
      ================================================== */}

      <ProductSection
        title="Pens & Writing"
        eyebrow="WRITE WITH STYLE"
        products={pens}
        onAddToCart={addToCart}
        onViewAll={() => {}}
      />

      {/* ==================================================
         KEYCHAINS
         NO VIEW ALL
      ================================================== */}

      <ProductSection
        title="Keychains"
        eyebrow="SMALL & STYLISH"
        products={keychains}
        onAddToCart={addToCart}
        onViewAll={() => {}}
      />

      {/* OFFER */}

      <OfferBanner />

      {/* FOOTER */}

      <Footer />

      {/* CART */}

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
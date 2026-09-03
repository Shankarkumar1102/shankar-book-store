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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductSection, setSelectedProductSection] =
    useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] =
    useState(null);

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

  const openCategory = (category) => {
    const products = categoryProducts[category] || [];

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

  const clearCategory = () => {
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openAllCategories = () => {
    setSelectedCategory({
      name: "All Categories",
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

  const openProductSection = (section) => {
    setSelectedProductSection(section);
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

  const handlePlaceOrder = (customer) => {
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const area = String(customer.area || "")
    .toLowerCase()
    .trim();

  let deliveryCharge = 0;

  if (subtotal > 99) {
    if (area.includes("mahilong")) {
      deliveryCharge = 10;
    } else if (area.includes("tatisilwai")) {
      deliveryCharge = 20;
    } else if (area.includes("namkum")) {
      deliveryCharge = 30;
    }
  }

  const totalAmount = subtotal + deliveryCharge;

  const newOrderId =
    "SB" + Date.now().toString().slice(-6);

  const orderItems = cart
    .map(
      (item) =>
        `• ${item.name} x ${item.quantity} = ₹${
          item.price * item.quantity
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

  window.open(whatsappURL, "_blank");

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

  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={backToCart}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

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
        onViewAll={openAllCategories}
      />

      <ProductSection
        title="Trending Products"
        eyebrow="WHAT'S POPULAR"
        products={[
          ...keychains,
          ...bottlesTiffins,
          ...photoFrames,
          ...resinFrames,
          ...artCraft,
          ...pencilBoxes,
        ]}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Trending Products",
            eyebrow: "WHAT'S POPULAR",
            products: [
              ...keychains,
              ...bottlesTiffins,
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
        products={[
          ...photoFrames,
          ...resinFrames,
        ]}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Frames",
            eyebrow: "SPECIAL MOMENTS",
            products: [
              ...photoFrames,
              ...resinFrames,
            ],
          })
        }
      />

      <ProductSection
        title="Water Bottles"
        eyebrow="EVERYDAY ESSENTIALS"
        products={bottlesTiffins}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Water Bottles",
            eyebrow: "EVERYDAY ESSENTIALS",
            products: bottlesTiffins,
          })
        }
      />

      <ProductSection
        title="Notebooks"
        eyebrow="WRITE IT DOWN"
        products={notebooks}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Notebooks",
            eyebrow: "WRITE IT DOWN",
            products: notebooks,
          })
        }
      />

      <ProductSection
        title="Pens & Writing"
        eyebrow="WRITE WITH STYLE"
        products={pens}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Pens & Writing",
            eyebrow: "WRITE WITH STYLE",
            products: pens,
          })
        }
      />

      <ProductSection
        title="Keychains"
        eyebrow="SMALL & STYLISH"
        products={keychains}
        onAddToCart={addToCart}
        onViewAll={() =>
          openProductSection({
            title: "Keychains",
            eyebrow: "SMALL & STYLISH",
            products: keychains,
          })
        }
      />
      <OfferBanner />
      <Footer />

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
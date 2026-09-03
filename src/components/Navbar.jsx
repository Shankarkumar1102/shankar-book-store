import "./Navbar.css";

function Navbar({
  cart,
  onCartClick,
  onSearch,
  searchTerm,
}) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      {/* ================= LOGO ================= */}

      <div className="navbar__logo">
        <span className="navbar__logo-mark">
          S
        </span>

        <div>
          <h1>SHANKAR</h1>
          <span>BOOK STORE</span>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="navbar__search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search notebooks, pens, art supplies..."
          value={searchTerm}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>

      {/* ================= LINKS ================= */}

      <div className="navbar__links">
        <a href="/">
          Home
        </a>

        <a href="#categories">
          Categories
        </a>

        {/* ================= CART ================= */}

        <button
          type="button"
          className="navbar__cart"
          onClick={onCartClick}
        >
          <span className="navbar__cart-icon">
            🛒
          </span>

          <span>
            Cart
          </span>

          {totalItems > 0 && (
            <span className="navbar__cart-count">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
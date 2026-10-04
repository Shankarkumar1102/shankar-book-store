import "./Footer.css";

function Footer({ onAdminLogin }) {
  return (
    <footer className="footer">
      {/* ================= MAIN ================= */}
      <div className="footer__main">
        {/* BRAND */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span>G</span>
            <div>
              <h2>GIVU</h2>
              <small>A LITTLE SOMETHING FOR YOU</small>
            </div>
          </div>

          <p>
            A little something to make every moment special.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer__links">
          <a href="/">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#products">Cart</a>
        </div>

        {/* DELIVERY */}
        <div className="footer__delivery">
          <span>LOCAL DELIVERY</span>
          <p>Mahilong • Tatisilwai • Namkum</p>
          <strong>4 PM – 9 PM</strong>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="footer__bottom">
        <p>© 2026 GIVU</p>

        <div className="footer__social">
          <a href="#" aria-label="Instagram">
            Instagram
          </a>

          <a href="#" aria-label="WhatsApp">
            WhatsApp
          </a>

          {/* ADMIN LOGIN */}
          <button
            type="button"
            className="footer__admin"
            onClick={onAdminLogin}
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
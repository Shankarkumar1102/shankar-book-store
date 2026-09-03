
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">

        <div className="footer__brand">
          <div className="footer__logo">
            <span>S</span>

            <div>
              <h2>SHANKAR</h2>
              <small>BOOK STORE</small>
            </div>
          </div>

          <p>
            Your local stationery store, now online.
          </p>
        </div>

        <div className="footer__links">
          <a href="/">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#products">Cart</a>
        </div>

        <div className="footer__delivery">
          <span>LOCAL DELIVERY</span>
          <p>Mahilong • Tatisilwai • Namkum</p>
          <strong>4 PM – 9 PM</strong>
        </div>

      </div>

      <div className="footer__bottom">

        <p>
          © 2026 Shankar Book Store
        </p>

        <div className="footer__social">
          <a
            href="#"
            aria-label="Instagram"
          >
            Instagram
          </a>

          <a
            href="#"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>

          <a
            href="/admin/login"
            className="footer__admin"
          >
            Admin Login
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
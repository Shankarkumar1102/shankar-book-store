import './OfferBanner.css';

function OfferBanner() {
  return (
    <section className="offer-banner">
      <div className="offer-banner__content">
        <span className="offer-banner__eyebrow">
          SHOP LOCAL • ORDER ONLINE
        </span>

        <h2>
          A little more stationery,
          <span> a little less delivery fee.</span>
        </h2>

        <p>
          Enjoy free local delivery on orders above ₹299.
        </p>

        <div className="offer-banner__areas">
          <span>Mahilong</span>
          <span>Tatisilwai</span>
          <span>Namkum</span>
        </div>

        <button className="offer-banner__button">
          Shop Now →
        </button>
      </div>

      <div className="offer-banner__visual">
        <div className="offer-banner__circle offer-banner__circle--one">
          ✦
        </div>

        <div className="offer-banner__circle offer-banner__circle--two">
          ✎
        </div>

        <div className="offer-banner__ticket">
          <span>FREE</span>
          <strong>DELIVERY</strong>
          <small>ON ORDERS ABOVE</small>
          <b>₹99</b>
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;
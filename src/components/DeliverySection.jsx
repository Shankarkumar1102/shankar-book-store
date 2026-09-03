import './DeliverySection.css';

function DeliverySection() {
  const areas = ['Mahilong', 'Tatisilwai', 'Namkum'];

  return (
    <section className="delivery">
      <div className="delivery__content">
        <span className="delivery__eyebrow">
          LOCAL EVENING DELIVERY
        </span>

        <h2>
          Your local store,
          <span> now at your door.</span>
        </h2>

        <p>
          Order your stationery online and get it delivered
          to your doorstep every evening.
        </p>

        <div className="delivery__time">
          <div className="delivery__time-icon">
            🕓
          </div>

          <div>
            <span>DELIVERY TIME</span>
            <strong>4:00 PM – 9:00 PM</strong>
          </div>
        </div>

        <button className="delivery__button">
          Start Shopping →
        </button>
      </div>

      <div className="delivery__visual">
        <div className="delivery__route">
          <div className="delivery__location">
            <span>🏪</span>
            <p>Shankar<br />Book Store</p>
          </div>

          <div className="delivery__line">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>

          <div className="delivery__bike">
            🛵
          </div>

          <div className="delivery__line delivery__line--second">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>

          <div className="delivery__home">
            🏠
          </div>
        </div>

        <div className="delivery__areas">
          <span>DELIVERING TO</span>

          <div>
            {areas.map((area) => (
              <span key={area}>
                📍 {area}
              </span>
            ))}
          </div>
        </div>

        <p className="delivery__note">
          Currently available only in Mahilong,
          Tatisilwai & Namkum.
        </p>
      </div>
    </section>
  );
}

export default DeliverySection;
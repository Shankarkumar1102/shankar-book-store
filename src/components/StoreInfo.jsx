import './StoreInfo.css';

function StoreInfo() {
  return (
    <section className="store-info">
      <div className="store-info__intro">
        <span className="store-info__eyebrow">
          YOUR NEIGHBOURHOOD STORE
        </span>

        <h2>
          Shankar Book
          <span> Store.</span>
        </h2>

        <p>
          Your local destination for notebooks, stationery,
          school essentials, art supplies and everyday items.
        </p>

        <button className="store-info__button">
          Shop Online →
        </button>
      </div>

      <div className="store-info__details">
        <div className="store-info__card">
          <div className="store-info__icon">
            🏪
          </div>

          <div>
            <span>STORE HOURS</span>

            <h3>9:00 AM – 12:00 PM</h3>
            <h3>4:00 PM – 9:00 PM</h3>
          </div>
        </div>

        <div className="store-info__card">
          <div className="store-info__icon store-info__icon--delivery">
            🚚
          </div>

          <div>
            <span>EVENING DELIVERY</span>

            <h3>4:00 PM – 9:00 PM</h3>

            <p>
              Mahilong • Tatisilwai • Namkum
            </p>
          </div>
        </div>

        <div className="store-info__card">
          <div className="store-info__icon store-info__icon--local">
            📍
          </div>

          <div>
            <span>LOCAL DELIVERY AREA</span>

            <h3>Mahilong</h3>
            <h3>Tatisilwai • Namkum</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreInfo;
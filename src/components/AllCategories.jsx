import "./AllCategories.css";

function AllCategories({ categories, onCategoryClick, onBack }) {
  return (
    <main className="all-categories">
      <div className="all-categories__header">
        <span className="all-categories__eyebrow">
          EXPLORE EVERYTHING
        </span>

        <h1>
          Shop by <span>Category</span>
        </h1>

        <p>
          Explore all our stationery, gifting and everyday
          essentials in one place.
        </p>
      </div>

      <button
        type="button"
        className="all-categories__back"
        onClick={onBack}
      >
        ← Back to Home
      </button>

      <div className="all-categories__grid">
        {categories.map((category) => (
          <button
            type="button"
            className="all-category-card"
            key={category.id}
            onClick={() =>
              onCategoryClick(category.name)
            }
          >
            <div className="all-category-card__image">
              <img
                src={category.image}
                alt={category.name}
              />
            </div>

            <div className="all-category-card__content">
              <h2>{category.name}</h2>

              <span>
                Explore Collection →
              </span>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

export default AllCategories;
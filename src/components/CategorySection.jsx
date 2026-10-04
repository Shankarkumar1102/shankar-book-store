import { useState } from "react";

import "./CategorySection.css";

function CategorySection({ onCategoryClick }) {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Cute Gifts",
      image: "/images/categories/gifting.jpg",
    },
    {
      id: 2,
      name: "Keychains",
      image: "/images/categories/keychains.jpg",
    },
    {
      id: 3,
      name: "Stationery",
      image: "/images/categories/other-stationery.jpg",
    },
    {
      id: 4,
      name: "Art & Craft",
      image: "/images/categories/art-craft.jpg",
    },
    {
      id: 5,
      name: "Photo Frames",
      image: "/images/photo-frames.jpg",
    },
    {
      id: 6,
      name: "Resin Frames",
      image: "/images/resin-frames.jpg",
    },
    {
      id: 7,
      name: "Diary & Notebooks",
      image: "/images/categories/notebooks.jpg",
    },
    {
      id: 8,
      name: "All Products",
      image: "/images/categories/all-products.jpg",
    },
  ];

  const handleViewAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
  };

  return (
    <section className="categories" id="categories">
      <div className="categories__header">
        <div>
          <span className="categories__eyebrow">
            EXPLORE GIVU
          </span>

          <h2>
            Shop by <strong>Category</strong>
          </h2>
        </div>

        <button
          type="button"
          className="categories__view-all"
          onClick={handleViewAll}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      {!showAll ? (
        <div className="categories__scroll">
          <div className="categories__list">
            {categories.map((category) => (
              <button
                type="button"
                className="category-card"
                key={category.id}
                onClick={() =>
                  handleCategoryClick(category.name)
                }
              >
                <div className="category-card__image-wrap">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-card__image"
                    loading="lazy"
                  />

                  <div className="category-card__shine" />
                </div>

                <div className="category-card__bottom">
                  <span className="category-card__name">
                    {category.name}
                  </span>

                  <span className="category-card__arrow">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="categories__all-grid">
          {categories.map((category) => (
            <button
              type="button"
              className="category-card"
              key={category.id}
              onClick={() =>
                handleCategoryClick(category.name)
              }
            >
              <div className="category-card__image-wrap">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-card__image"
                  loading="lazy"
                />

                <div className="category-card__shine" />
              </div>

              <div className="category-card__bottom">
                <span className="category-card__name">
                  {category.name}
                </span>

                <span className="category-card__arrow">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategorySection;
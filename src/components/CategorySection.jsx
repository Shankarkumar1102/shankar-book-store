import { useState } from "react";
import "./CategorySection.css";

function CategorySection({ onCategoryClick}) {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Notebooks",
      image: "/images/categories/notebooks.jpg",
    },
    {
      id: 2,
      name: "Pens & Writing",
      image: "/images/categories/pens.jpg",
    },
    {
      id: 3,
      name: "School & Office",
      image: "/images/categories/school-office.jpg",
    },
    {
      id: 4,
      name: "Art & Craft",
      image: "/images/categories/art-craft.jpg",
    },
    {
      id: 5,
      name: "Pencil Boxes",
      image: "/images/categories/pencil-boxes.jpg",
    },
    {
      id: 6,
      name: "Bottles & Tiffins",
      image: "/images/categories/bottles-tiffins.jpg",
    },
    {
      id: 7,
      name: "Keychains",
      image: "/images/categories/keychains.jpg",
    },
    {
      id: 8,
      name: "Other Stationery",
      image: "/images/categories/other-stationery.jpg",
    },
    {
      id: 9,
      name: "Gifting Items",
      image: "/images/categories/gifting.jpg",
    },
    {
      id: 10,
      name: "Photo Frames",
      image: "/images/photo-frames.jpg",
    },
    {
      id: 11,
      name: "Resin Frames",
      image: "/images/resin-frames.jpg",
    },
  ];

  const handleViewAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section className="categories" id="categories">
      <div className="categories__header">
        <h2>
          Shop by <strong>Category</strong>
        </h2>

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
                className="category-item"
                key={category.id}
                onClick={() => onCategoryClick(category.name)}
              >
                <div className="category-item__image">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />
                </div>

                <span className="category-item__name">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="categories__all-grid">
          {categories.map((category) => (
            <button
              type="button"
              className="category-item category-item--grid"
              key={category.id}
              onClick={() => onCategoryClick(category.name)}
            >
              <div className="category-item__image">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              </div>

              <span className="category-item__name">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategorySection;
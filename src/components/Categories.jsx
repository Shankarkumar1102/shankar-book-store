import "./Categories.css";

function Categories({ onCategoryClick }) {
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

  return (
    <section className="all-categories">

      <div className="all-categories__header">
        <span>EXPLORE OUR COLLECTION</span>

        <h1>
          Shop by <strong>Category</strong>
        </h1>

        <p>
          Find everything you need, all in one place.
        </p>
      </div>

      <div className="all-categories__grid">
        {categories.map((category) => (
          <button
            type="button"
            className="all-category-card"
            key={category.id}
            onClick={() => onCategoryClick(category.name)}
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
                Shop Now <b>→</b>
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
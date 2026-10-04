import { useEffect, useState } from "react";

import "./Hero.css";

const slides = [
  {
    id: 1,
    tag: "CUTE GIFTS",
    title: "Little Gifts,",
    highlight: "Big Smiles",
    description:
      "Discover cute and thoughtful gifts made to add a little happiness to every moment.",
    button: "Shop Cute Gifts",
    emoji: "🎁",
    items: ["🎀", "🧸", "💝", "✨"],
  },

  {
    id: 2,
    tag: "TRENDING NOW",
    title: "Small Things,",
    highlight: "Big Style",
    description:
      "Explore trending keychains, stationery, frames and cute everyday products.",
    button: "Explore Trending",
    emoji: "✨",
    items: ["🔑", "🖼️", "💖", "✨"],
  },

  {
    id: 3,
    tag: "ART & CRAFT",
    title: "Create More,",
    highlight: "Imagine More",
    description:
      "Bring your ideas to life with creative art and craft supplies made for everyone.",
    button: "Shop Art & Craft",
    emoji: "🎨",
    items: ["🎨", "🖌️", "✂️", "🖍️"],
  },

  {
    id: 4,
    tag: "GIVU",
    title: "A Little Something",
    highlight: "for You.",
    description:
      "Find something cute, creative and special for yourself or someone you love.",
    button: "Start Shopping",
    emoji: "💝",
    items: ["🎁", "💖", "🛍️", "✨"],
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className="hero" id="home">
      <div className="hero__banner">
        {/* LEFT ARROW */}
        <button
          type="button"
          className="hero__arrow hero__arrow--left"
          onClick={previousSlide}
          aria-label="Previous banner"
        >
          ‹
        </button>

        {/* BANNER */}
        <div className="hero__slide" key={slide.id}>
          {/* LEFT CONTENT */}
          <div className="hero__content">
            <span className="hero__tag">{slide.tag}</span>

            <h1>
              {slide.title}
              <span>{slide.highlight}</span>
            </h1>

            <p>{slide.description}</p>

            <a href="#products" className="hero__button">
              {slide.button}
              <span>→</span>
            </a>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hero__visual">
            <div className="hero__visual-circle"></div>

            <div className="hero__product-icons">
              {slide.items.map((item, index) => (
                <div
                  className={`hero__icon hero__icon--${index + 1}`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="hero__main-product">
              <span>{slide.emoji}</span>
            </div>

            <div className="hero__offer">
              <small>GIVE</small>
              <strong>LOVE</strong>
            </div>
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button
          type="button"
          className="hero__arrow hero__arrow--right"
          onClick={nextSlide}
          aria-label="Next banner"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="hero__dots">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero__dot ${
                currentSlide === index ? "hero__dot--active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
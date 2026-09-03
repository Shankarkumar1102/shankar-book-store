import './WhyShankar.css';

function WhyShankar() {
  const reasons = [
    {
      icon: '🏪',
      title: 'Your Local Store',
      description:
        'Your neighbourhood stationery store, now available online.',
    },
    {
      icon: '⚡',
      title: 'Easy Ordering',
      description:
        'Choose your products, add them to cart and order in just a few steps.',
    },
    {
      icon: '🚚',
      title: 'Evening Delivery',
      description:
        'Get your stationery delivered locally between 4 PM and 9 PM.',
    },
    {
      icon: '💯',
      title: 'Everyday Essentials',
      description:
        'Notebooks, pens, school supplies, art materials and more.',
    },
  ];

  return (
    <section className="why-shankar">
      <div className="why-shankar__header">
        <span>WHY SHOP WITH US</span>

        <h2>
          Your local store,
          <strong> made easier.</strong>
        </h2>

        <p>
          The things you need from a store you already know
          and trust — now just a few clicks away.
        </p>
      </div>

      <div className="why-shankar__grid">
        {reasons.map((reason) => (
          <article className="why-card" key={reason.title}>
            <div className="why-card__icon">
              {reason.icon}
            </div>

            <h3>{reason.title}</h3>

            <p>{reason.description}</p>

            <span className="why-card__arrow">
              →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhyShankar;
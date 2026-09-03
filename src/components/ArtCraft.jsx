import './ArtCraft.css';

function ArtCraft() {
  const artItems = [
    {
      id: 1,
      icon: '🎨',
      name: 'Colours',
    },
    {
      id: 2,
      icon: '🖌️',
      name: 'Brushes',
    },
    {
      id: 3,
      icon: '✂️',
      name: 'Craft Supplies',
    },
    {
      id: 4,
      icon: '📄',
      name: 'Craft Papers',
    },
  ];

  return (
    <section
      className="art-craft"
      id="art-craft"
    >
      <div className="art-craft__content">

        <span className="art-craft__eyebrow">
          LET YOUR CREATIVITY FLOW
        </span>

        <h2>
          Create something
          <span> beautiful.</span>
        </h2>

        <p>
          Explore colours, brushes, papers and craft
          essentials for school projects and creative ideas.
        </p>

        <button className="art-craft__button">
          Explore Art & Craft →
        </button>

      </div>

      <div className="art-craft__visual">

        <div className="art-craft__circle art-craft__circle--orange"></div>

        <div className="art-craft__circle art-craft__circle--sage"></div>

        {artItems.map((item) => (
          <div
            className={`art-item art-item--${item.id}`}
            key={item.id}
          >
            <span>{item.icon}</span>

            <p>{item.name}</p>
          </div>
        ))}

        <div className="art-craft__center">
          <span>🎨</span>

          <strong>CREATE</strong>

          <small>YOUR WAY</small>
        </div>

      </div>
    </section>
  );
}

export default ArtCraft;
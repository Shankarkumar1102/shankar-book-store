import './SchoolEssentials.css';

function SchoolEssentials() {
  const essentials = [
    {
      id: 1,
      icon: '📓',
      title: 'Notebooks',
      text: 'For notes, homework & everyday learning.',
    },
    {
      id: 2,
      icon: '✏️',
      title: 'Writing Essentials',
      text: 'Pens, pencils and everything to write.',
    },
    {
      id: 3,
      icon: '📦',
      title: 'Pencil Boxes',
      text: 'Keep your school essentials organised.',
    },
    {
      id: 4,
      icon: '📐',
      title: 'School Supplies',
      text: 'Useful essentials for every school day.',
    },
  ];

  return (
    <section
      className="school-essentials"
      id="school-essentials"
    >
      <div className="school-essentials__content">
        <span className="school-essentials__eyebrow">
          FOR EVERY SCHOOL DAY
        </span>

        <h2>
          School essentials,
          <span> all in one place.</span>
        </h2>

        <p>
          From notebooks and pens to pencil boxes and
          everyday supplies, get everything you need
          for school without the extra trip.
        </p>

        <button className="school-essentials__button">
          Shop School Essentials →
        </button>
      </div>

      <div className="school-essentials__items">
        {essentials.map((item) => (
          <div
            className="school-item"
            key={item.id}
          >
            <div className="school-item__icon">
              {item.icon}
            </div>

            <div className="school-item__content">
              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>

            <span className="school-item__arrow">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SchoolEssentials;
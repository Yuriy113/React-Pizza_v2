import React, { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((v, i) => (
          <li
            onClick={() => onClickCategory(i)}
            key={i}
            className={activeIndex === i ? 'active' : ''}
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

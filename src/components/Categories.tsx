import React, { useState } from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li onClick={() => onChangeCategory(i)} key={i} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

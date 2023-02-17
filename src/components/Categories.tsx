import React, { memo, useState } from 'react';
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory });

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
});

export default Categories;

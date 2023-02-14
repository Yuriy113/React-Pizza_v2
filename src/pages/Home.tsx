import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../components/redux/slices/filterSlice';
import { fetchPizzas } from '../components/redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../components/redux/store';
import { SearchPizzaParams } from '../components/redux/slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } = useSelector((state: any) => state.filter);
  const { items, status } = useSelector((state: any) => state.pizza);
  const sortType = sort.sortProperty;
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        search,
        category,
        currentPage,
        sortType,
        order,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const [order, setOrder] = useState('desc');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, order]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, categoryId, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  const onOrderChange = () => {
    order === 'desc' ? setOrder('ask') : setOrder('desc');
    console.log(order);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort order={order} onOrderChange={onOrderChange} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

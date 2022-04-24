import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../app/slice/productsSlice';
import CountryCard from '../../components/CountryCard';

import './styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const { countries, status } = useSelector((state) => state.products);
  // const [countriesNames, setCountriesNames] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderCountries = () => {
    if (status === 'loading') return <p>Loading...</p>;

    // setCountriesNames(Object.keys(countries));
    const countriesNames = Object.keys(countries);

    return countriesNames.map((country) => (
      <CountryCard
        name={country}
        totalBrands={Object.keys(countries[country].brands).length}
        noodlesVarieties={countries[country].products.length}
      />
    ));
  };

  return <div className='container d-grid gap-5'>{renderCountries()}</div>;
};

export default Home;

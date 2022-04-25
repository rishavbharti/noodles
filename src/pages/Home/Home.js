import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../app/slice/productsSlice';
import CountryCard from '../../components/CountryCard';

import './styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const { countries, status } = useSelector((state) => state.products);
  const [countriesName, setCountriesName] = useState([]);

  const observer = useRef();

  const lastCountry = useCallback(
    (node) => {
      if (status === 'loading') return;
      console.log('node', node);
      console.log('observer', observer.current);

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        const [entry] = entries;
        console.log('isIntersecting', entry);

        if (entry.isIntersecting) {
          setCountriesName([...countriesName, ...countriesName]);

          // observer.current.unobserve(node);
          // observer.current.unobserve(entry.target);
        }
      });

      if (node) observer.current.observe(node);
    },
    [status, countriesName]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(countries).length && !countriesName.length) {
      setCountriesName(Object.keys(countries));
    }
  }, [countries, countriesName.length]);

  const renderCountries = () => {
    if (status === 'loading') return <p>Loading...</p>;

    return countriesName.map((country, i) => {
      if (i === countriesName.length - 1) {
        return (
          <CountryCard
            name={country}
            ref={lastCountry}
            totalBrands={Object.keys(countries[country].brands).length}
            noodlesVarieties={countries[country].products.length}
          />
        );
      }

      return (
        <CountryCard
          name={country}
          totalBrands={Object.keys(countries[country].brands).length}
          noodlesVarieties={countries[country].products.length}
        />
      );
    });
  };

  return <div className='container d-grid gap-5'>{renderCountries()}</div>;
};

export default Home;

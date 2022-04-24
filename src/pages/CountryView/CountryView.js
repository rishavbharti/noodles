import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../app/slice/productsSlice';
import BrandCard from '../../components/BrandCard';
import { generateRandomNumber } from '../../utils/utils';

const CountryView = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState({
    status: 'idle',
    data: [],
    total: 0,
  });

  const { brands, countries, status, totalProducts } = useSelector(
    (state) => state.products
  );

  let { country } = useParams();

  useEffect(() => {
    if (!totalProducts && status !== 'loading') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status, totalProducts]);

  useEffect(() => {
    setImages({ ...images, status: 'loading' });
    fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setImages({
          status: 'success',
          total: data.length,
          data: data,
        });
      });
  }, []);

  const renderContent = () => {
    if (!countries?.[country]) {
      return <p>Nothing found!</p>;
    }

    if (images.status === 'loading') {
      return <p>Loading...</p>;
    }

    const brandNames = Object.keys(countries[country].brands);

    return brandNames.map((brand) => (
      <BrandCard
        name={brand}
        image={images.data[generateRandomNumber(images.total)]?.Image}
        country={country}
        totalVarieties={brands[brand].length}
        varietiesInCountry={countries[country].brands[brand].length}
      />
    ));
  };

  return (
    <div>
      <h2>{country}</h2>
      <div className='d-grid gap-5'>{renderContent()}</div>
    </div>
  );
};

export default CountryView;

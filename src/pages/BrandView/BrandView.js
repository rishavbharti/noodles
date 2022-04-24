import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../app/slice/productsSlice';
import VariantCard from '../../components/VariantCard';

const BrandView = () => {
  const dispatch = useDispatch();

  const { brands, status, totalProducts } = useSelector(
    (state) => state.products
  );

  let { brand } = useParams();

  useEffect(() => {
    if (!totalProducts && status !== 'loading') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status, totalProducts]);

  const renderContent = () => {
    if (!brands?.[brand]) {
      return <p>Nothing found!</p>;
    }

    const varieties = brands[brand];

    return varieties.map((brand) => (
      <VariantCard
        name={brand.Variety}
        style={brand.Style}
        country={brand.Country}
        stars={brand.Stars}
        topTen={brand['Top Ten']}
      />
    ));
  };

  return (
    <div>
      <h2>{brand}</h2>
      {renderContent()}
    </div>
  );
};

export default BrandView;

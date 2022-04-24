import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const BrandCard = (props) => {
  const { name, image, country, totalVarieties, varietiesInCountry } = props;

  return (
    <Link to={`/brand/${name}`}>
      <div className='brand-card'>
        <img src={image} alt={name} className='brand-image' />
        <h3>{name}</h3>
        <p>Total variety of noodles under brand: {totalVarieties}</p>

        <p>
          Total variety of noodles in {country}: {varietiesInCountry}
        </p>
      </div>
    </Link>
  );
};

export default BrandCard;

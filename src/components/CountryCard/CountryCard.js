import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const CountryCard = (props) => {
  const { name, totalBrands, noodlesVarieties } = props;

  return (
    <Link to={`/${name}`}>
      <div className='card'>
        <h3>{name}</h3>
        <p>Number of brands: {totalBrands}</p>
        <p>Variety of noodles: {noodlesVarieties}</p>
      </div>
    </Link>
  );
};

export default CountryCard;

import React from 'react';

const VariantCard = (props) => {
  const { name, style, country, stars, topTen } = props;

  return (
    <div className='bg-light border card'>
      <h3>{name}</h3>
      <p>Style: {style}</p>
      <p>Country: {country}</p>
      <p>Stars: {stars}</p>
      <p>Top Ten: {topTen}</p>
    </div>
  );
};

export default VariantCard;

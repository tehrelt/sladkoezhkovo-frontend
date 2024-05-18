import React from 'react';

type Props = {
  range?: {
    min: number;
    max: number;
  };

  prices?: number[];
};

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export const Price = ({ value }: { value: number }) => {
  return (
    <span className="text-xl text-green-400 font-black">
      {formatter.format(value)}
    </span>
  );
};

export const PriceRange = ({ range, prices }: Props) => {
  if (!range && !prices) {
    return <span>Цена не указана</span>;
  }

  if (prices) {
    const { max, min } = { max: Math.max(...prices), min: Math.min(...prices) };
    return (
      <span className="text-xl text-green-400 font-black">
        <Price value={min} /> - <Price value={max} />
      </span>
    );
  }

  return (
    <span className="text-xl text-green-400 font-black">
      <Price value={range.min} /> - <Price value={range.max} />
    </span>
  );
};

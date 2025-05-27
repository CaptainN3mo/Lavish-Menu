import React from 'react';

interface PriceFilterProps {
  categories: string[];
  onPriceChange: (min: number, max: number) => void;
  onCategoryChange: (category: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ categories, onPriceChange, onCategoryChange }) => {
  return (
    <div>
      <h2>Price Filter</h2>
      {/* Add your price filter logic here */}
    </div>
  );
};

export default PriceFilter; 

import React from 'react';
import { Minus, Plus } from './icons';

interface QuantitySelectorProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, min, max, step = 100, onChange }) => {
  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numValue = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numValue)) {
      numValue = min;
    }
    onChange(numValue);
  };
  
  const handleBlur = () => {
    let correctedValue = Math.max(min, value);
    correctedValue = Math.min(max, correctedValue);
    if (correctedValue !== value) {
        onChange(correctedValue);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="p-3 bg-gray-200 rounded-l-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrement quantity"
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        value={value.toLocaleString()}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-32 text-center text-lg font-semibold border-t border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b8c0ff] focus:border-transparent py-2"
      />
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="p-3 bg-gray-200 rounded-r-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increment quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;

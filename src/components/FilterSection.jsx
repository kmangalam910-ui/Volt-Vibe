import React, { useState } from 'react';
import useCategoriesLogic from '../hooks/useCategoriesLogic';
import useFilterLogic from '../hooks/useFilterLogic';
import { SlidersHorizontal, ChevronDown, ChevronUp, Search } from 'lucide-react';

const FilterSection = ({ filterLogic: passedFilterLogic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    categoryOnlyData, 
    colorOnlyData, 
    priceOnlyData 
  } = useCategoriesLogic();
  
  const fallbackFilterLogic = useFilterLogic();
  const filterLogic = passedFilterLogic || fallbackFilterLogic;

  const {
    search,
    setSearch,
    category,
    color,
    priceRange,
    setPriceRange,
    handleCategoryChange,
    handleColorChange,
    handleResetFilter
  } = filterLogic;

  const numericPrices = priceOnlyData.slice(1);
  const minPrice = numericPrices.length > 0 ? Math.min(...numericPrices) : 299;
  const maxPrice = numericPrices.length > 0 ? Math.max(...numericPrices) : 74999;

  return (
    <div className='bg-gray-100 rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300'>
      {/* Filter Header / Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='p-4 flex items-center justify-between cursor-pointer select-none bg-white hover:bg-gray-50 transition-colors'
      >
        <div className='flex items-center gap-2 font-semibold text-gray-800 text-base sm:text-lg'>
          <SlidersHorizontal className='w-5 h-5 text-red-500' />
          <span>Filters</span>
        </div>
        <button
          type="button"
          className='flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer'
        >
          <span>{isOpen ? 'Hide Filters' : 'Show Filters'}</span>
          {isOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
        </button>
      </div>

      {/* Filter Body (Collapsible) */}
      {isOpen && (
        <div className='p-4 border-t border-gray-200 flex flex-col lg:flex-row flex-wrap items-center justify-between gap-4 bg-gray-100'>
          {/* Search Input */}
          <div className='w-full lg:w-auto flex-1 min-w-50 relative flex items-center'>
            <Search className='absolute left-3 h-4 w-4 text-gray-400 pointer-events-none' />
            <input
              type="text"
              className='py-2 pl-9 pr-3 bg-white rounded-lg border-gray-300 border-2 w-full focus:outline-none focus:border-red-500 transition-colors text-sm placeholder-gray-400'
              placeholder='Search...'
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </div>

          {/* Categories */}
          <div className='flex flex-wrap items-center gap-3'>
            <span className='font-semibold text-gray-700 text-sm'>Categories:</span>
            <div className='flex flex-wrap items-center gap-2'>
              {
                categoryOnlyData.map((item, index) => {
                  return (
                    <label key={index} className='flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm uppercase bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium'>
                      <input
                        type="checkbox"
                        name={item}
                        checked={category === item}
                        value={item}
                        className='accent-red-500 cursor-pointer'
                        onChange={handleCategoryChange}
                      />
                      <span>{item}</span>
                    </label>
                  )
                })
              }
            </div>
          </div>

          {/* Colour */}
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700 text-sm'>Colour:</span>
            <select
              className='p-2 bg-white rounded-lg border-gray-300 border-2 text-sm focus:outline-none focus:border-red-500 cursor-pointer'
              value={color}
              onChange={handleColorChange}
            >
              {
                colorOnlyData.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item.toUpperCase()}
                    </option>
                  )
                })
              }
            </select>
          </div>

          {/* Price Range */}
          <div className='flex flex-col sm:flex-row items-center gap-2'>
            <label className='font-semibold text-gray-700 text-sm whitespace-nowrap'>
              {`Price: $${priceRange[0]} - $${priceRange[1]}`}
            </label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              className='accent-red-500 cursor-pointer'
              onChange={(event) => setPriceRange([priceRange[0], Number(event.target.value)])}
            />
          </div>

          {/* Reset Filter */}
          <div>
            <button 
              type="button"
              onClick={handleResetFilter}
              className='bg-red-500 hover:bg-red-600 py-1.5 px-4 rounded-full text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-sm'
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
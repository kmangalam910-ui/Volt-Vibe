import React, { useContext, useEffect } from 'react';
import { DataContext } from '../store/contextStore';
import useCategoriesLogic from '../hooks/useCategoriesLogic';

const Categories = () => {
  
  const { categoryOnlyData } = useCategoriesLogic();

  return (
    <div className='bg-[#101829]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-evenly py-7 px-4 '>
        {
          categoryOnlyData.map((item, index) => {
            return <button key={index} className='inline-flex items-center justify-center rounded-full bg-linear-to-r from-red-500 to-pink-500 px-5 py-2.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:opacity-95 hover:scale-105 active:scale-95 cursor-pointer'>
              {item}
            </button>
          })
        }
      </div>
    </div>
  )
}

export default Categories;
import React from 'react';
import { IoCartOutline, IoCheckmarkCircle } from 'react-icons/io5';
import useProductCardLogic from '../hooks/useProductCardLogic';

const ProductCard = ({ product }) => {
  const {
    isAdded,
    showToast,
    handleAddToCart,
    handleViewProduct,
    handleViewCart,
  } = useProductCardLogic(product);

  return (
    <>
      <div 
        onClick={handleViewProduct}
        className='border relative border-gray-100 rounded-2xl cursor-pointer shadow-md shadow-black hover:shadow-2xl transition-all p-3 flex flex-col h-full bg-white'
      >
        <div className='flex'>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className='bg-gray-100 size-40 aspect-square object-contain rounded-xl p-2 transition-transform duration-300 hover:scale-105' 
            onClick={handleViewProduct}
          />

          <div className='flex flex-col ms-5 justify-around gap-1'>
            <h1 className='p-1 font-bold text-gray-900 line-clamp-1'>{product.title}</h1>
            <h3 className='p-1 font-semibold text-gray-600 text-sm line-clamp-2'>{product.description}</h3>
            <p className='my-1 text-lg text-gray-900 font-extrabold'>${product.price}</p>
          </div>
        </div>

        <div className='flex justify-center gap-3 mt-auto pt-3 border-t border-gray-100'>
          <button 
            className='bg-gray-100 mt-auto px-4 py-2 text-sm md:text-base rounded-full text-gray-800 md:w-max cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-gray-200 active:scale-95 transition-all duration-150' 
            onClick={handleViewProduct}
          >
            View Product
          </button>

          <button 
            onClick={handleAddToCart}
            className={`mt-auto px-4 py-2 text-sm md:text-base rounded-full text-white max-md:w-max cursor-pointer flex gap-2 items-center justify-center font-semibold shadow-md active:scale-90 transition-all duration-200 ${
              isAdded 
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30' 
                : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
            }`}
          >
            {isAdded ? (
              <>
                <IoCheckmarkCircle className='w-5 h-5 text-white animate-bounce' />
                <span>Added!</span>
              </>
            ) : (
              <>
                <IoCartOutline className='w-5 h-5' />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add to Cart Pop-Up Toast Notification */}
      {showToast && (
        <div className='fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-white border border-emerald-200 p-4 rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-emerald-500/20 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm'>
          <div className='relative shrink-0'>
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className='w-12 h-12 object-contain bg-gray-50 rounded-xl p-1 border border-gray-100' 
            />
            <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]'>
              ✓
            </span>
          </div>

          <div className='flex flex-col flex-1 min-w-0'>
            <div className='flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider'>
              <IoCheckmarkCircle className='w-4 h-4' /> Added to Cart!
            </div>
            <p className='font-bold text-gray-900 text-sm truncate mt-0.5'>{product.title}</p>
            <p className='text-xs text-gray-500 font-semibold'>${product.price}</p>
          </div>

          <button 
            onClick={handleViewCart}
            className='bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3.5 py-2 rounded-full transition shadow-md shadow-red-500/25 active:scale-95 shrink-0 cursor-pointer'
          >
            View Cart
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCard;
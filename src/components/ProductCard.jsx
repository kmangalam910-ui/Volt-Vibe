import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer shadow-md shadow-black hover:shadow-2xl transition-all p-3 flex flex-col h-full'>
      <div className='flex'>
        <img 
          src={product.imageUrl} 
          alt="prd" 
          className='bg-gray-100 size-40 aspect-square object-contain' 
          onClick={() => navigate(`/products/${product.id}`)}
        />

        <div className='flex flex-col ms-5 justify-around gap-1'>
          <h1 className='p-1 font-bold'>{product.title}</h1>
          <h3 className='p-1 font-semibold'>{product.description}</h3>
          <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
        </div>
      </div>

      <div className='flex gap-3 mt-auto'>
        <button className='bg-gray-200 mt-auto px-3 py-2 text-lg rounded-full text-gray-800 w-full cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-gray-300 transition-all' onClick={() => console.log('Viewed')}>View Product</button>

        <button 
          onClick={() => console.log('clicked')} 
          className='bg-red-500 mt-auto px-3 py-2 text-lg rounded-full text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-red-600 transition-all'
        >
          <IoCartOutline className='w-6 h-6' /> Add to Cart
        </button>
        
      </div>
    </div>
  )
}

export default ProductCard;
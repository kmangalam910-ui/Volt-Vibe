import React from 'react'
import banner from '../assets/banner1.jpg'

const MidBanner = () => {
  return (
    <div className='bg-gray-100 md:py-24'>
      <div className='relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-137.5 md:h-150 ' style={{backgroundImage: `url(${banner})`, backgroundPosition:'center', backgroundAttachment: 'fixed'}}>
        <div className='absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center'>
            <div className='text-center text-white px-4'>
                <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4'>Next-Gen Electronics at Your Fingertips</h1>
                <p className='text-lg md:text-xl mb-6'>Discover the latest tech innovations with unbeatable prices and free shipping on all orders.</p>
                <button className='inline-flex items-center justify-center rounded-full bg-linear-to-r from-red-500 to-pink-500 px-5 py-2.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:opacity-95 hover:scale-105 active:scale-95 cursor-pointer'>Shop Now</button>
            </div>
        </div>
      </div>
    </div>
  )
};

export default MidBanner;
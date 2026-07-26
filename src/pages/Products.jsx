import React, { useContext, useEffect } from 'react'
import { DataContext } from '../store/contextStore';
import FilterSection from '../components/FilterSection';
import Loading from '../assets/Loading4.webm';
import ProductCard from '../components/ProductCard';
import useFilterLogic from '../hooks/useFilterLogic';

const Products = () => {
  const { fetchProducts } = useContext(DataContext);
  const filterLogic = useFilterLogic();
  const { filteredData, products } = filterLogic;

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 my-6'>
        {products.length > 0 ? (
          <div className='flex flex-col gap-6'>
            <FilterSection filterLogic={filterLogic} />
            {filteredData.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {filteredData.map((product, index) => {
                  return <ProductCard key={index} product={product} />;
                })}
              </div>
            ) : (
              <div className='py-12 text-center text-gray-500 font-semibold bg-gray-50 rounded-xl border border-gray-200'>
                No products found matching your filters. Try resetting the filters.
              </div>
            )}
          </div>
        ) : (
          <div className='flex items-center justify-center h-125'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
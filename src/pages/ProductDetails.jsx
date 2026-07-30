import React from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Plus, 
  Minus, 
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  Award,
  Zap
} from 'lucide-react';
import useProductDetailsLogic from '../hooks/useProductDetailsLogic';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const {
    product,
    customDetails,
    relatedProducts,
    quantity,
    activeTab,
    setActiveTab,
    isAdded,
    showToast,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleAddToCart,
    handleBuyNow,
    navigate
  } = useProductDetailsLogic();

  if (!product || !customDetails) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center gap-4 py-16 px-4'>
        <Loader size={8} label='Loading product details...' />
        <p className='text-gray-500 font-semibold text-sm'>Fetching technical specifications</p>
      </div>
    );
  }

  const {
    specs,
    highlights,
    rating,
    reviewsCount,
    stockCount,
    isLowStock,
    sku,
    brand,
    warranty,
    returnPolicy
  } = customDetails;

  return (
    <div className='min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-12'>
        
        {/* Breadcrumb Navigation */}
        <nav className='flex items-center gap-2 text-xs sm:text-sm text-gray-500'>
          <Link to='/' className='hover:text-red-500 transition'>Home</Link>
          <span>/</span>
          <Link to='/products' className='hover:text-red-500 transition'>Products</Link>
          <span>/</span>
          {product.category && (
            <>
              <span className='capitalize font-medium text-gray-700'>{product.category}</span>
              <span>/</span>
            </>
          )}
          <span className='font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs'>{product.title}</span>
        </nav>

        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition cursor-pointer'
          >
            <ArrowLeft size={16} /> Back to Products
          </button>
        </div>

        {/* Main Product Showcase Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm'>
          
          {/* Left Column: Image Showcase */}
          <div className='flex flex-col gap-4'>
            <div className='relative flex h-80 sm:h-96 w-full items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-6 overflow-hidden group'>
              <img
                src={product.imageUrl || product.image}
                alt={product.title}
                className='max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110'
              />

              {/* Stock Status Badge */}
              <div className='absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold shadow-sm border border-gray-100'>
                <span className={`h-2 w-2 rounded-full ${isLowStock ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className={isLowStock ? 'text-amber-700' : 'text-emerald-700'}>
                  {isLowStock ? `Only ${stockCount} left in stock!` : 'In Stock & Ready to Ship'}
                </span>
              </div>

              {/* SKU Badge */}
              <div className='absolute bottom-4 right-4 rounded-lg bg-gray-900/80 text-white px-2.5 py-1 text-[11px] font-mono tracking-wider backdrop-blur'>
                {sku}
              </div>
            </div>

            {/* Guarantees Cards under image */}
            <div className='grid grid-cols-2 gap-3 pt-2'>
              <div className='flex items-center gap-3 rounded-xl bg-gray-50 shadow-md p-3 border border-gray-100'>
                <Award size={20} className='text-red-500 shrink-0' />
                <div>
                  <h5 className='text-xs font-bold text-gray-900'>{warranty}</h5>
                  <p className='text-[11px] text-gray-500'>Official Manufacturer</p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-xl bg-gray-50 shadow-md p-3 border border-gray-100'>
                <PackageCheck size={20} className='text-emerald-500 shrink-0' />
                <div>
                  <h5 className='text-xs font-bold text-gray-900'>{returnPolicy}</h5>
                  <p className='text-[11px] text-gray-500'>Easy & Free Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Box */}
          <div className='flex flex-col gap-6'>
            
            {/* Category & Brand */}
            <div className='flex items-center justify-between gap-2'>
              <span className='rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 uppercase tracking-wider border border-red-100'>
                {product.category || 'Electronics'}
              </span>
              <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
                Brand: <span className='text-gray-700'>{brand}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight'>
              {product.title}
            </h1>

            {/* Ratings & Reviews */}
            <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
              <div className='flex items-center gap-1 text-amber-400'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className='fill-amber-400 text-amber-400' />
                ))}
              </div>
              <span className='text-sm font-bold text-gray-800'>{rating}</span>
              <span className='text-xs text-gray-400'>|</span>
              <span className='text-xs font-semibold text-gray-500 hover:text-red-500 cursor-pointer underline'>
                {reviewsCount} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-4'>
              <span className='text-3xl sm:text-4xl font-black text-red-500'>
                ${product.price}
              </span>
              <span className='text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-md'>
                Includes all taxes & free warranty
              </span>
            </div>

            {/* Description */}
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              {product.description}
            </p>

            {/* Key Features Bullet List */}
            <div className='rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-2'>
              <h4 className='text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5'>
                <Zap size={14} className='text-amber-500' /> Product Highlights
              </h4>
              <ul className='grid grid-cols-1 gap-2 text-xs text-gray-700'>
                {highlights.slice(0, 3).map((item, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <CheckCircle2 size={14} className='text-emerald-500 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className='space-y-4 pt-2 border-t border-gray-100'>
              
              {/* Quantity Selector */}
              <div className='flex items-center gap-4'>
                <span className='text-sm font-bold text-gray-800'>Quantity:</span>
                <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1'>
                  <button
                    onClick={handleDecrementQuantity}
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer'
                  >
                    <Minus size={16} />
                  </button>
                  <span className='w-10 text-center font-bold text-sm text-gray-900'>
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrementQuantity}
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-bold text-white shadow-md active:scale-95 transition-all duration-200 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
                      : 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <IoCheckmarkCircle className='w-5 h-5 animate-bounce' />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <IoCartOutline className='w-5 h-5' />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className='flex items-center justify-center gap-2 rounded-full bg-gray-900 hover:bg-gray-800 py-3.5 px-6 font-bold text-white shadow-lg active:scale-95 transition-all duration-200 cursor-pointer'
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center text-xs text-gray-500'>
              <div className='flex flex-col items-center gap-1'>
                <Truck size={18} className='text-red-500' />
                <span>Fast Shipping</span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <ShieldCheck size={18} className='text-emerald-500' />
                <span>Secure Checkout</span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <Headphones size={18} className='text-blue-500' />
                <span>24/7 Support</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className='bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6'>
          
          {/* Tab Buttons */}
          <div className='flex border-b border-gray-200 gap-6 overflow-x-auto pb-1 scrollbar-none'>
            {[
              { id: 'overview', label: 'Product Overview' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'reviews', label: `Reviews (${reviewsCount})` },
              { id: 'shipping', label: 'Shipping & Returns' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className='pt-2'>
            {activeTab === 'overview' && (
              <div className='space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base'>
                <h3 className='text-lg font-bold text-gray-900'>About {product.title}</h3>
                <p>
                  Experience state-of-the-art innovation with the <span className='font-bold text-gray-900'>{product.title}</span>. Designed specifically for enthusiasts and professionals who demand top-tier performance, reliability, and modern aesthetic styling.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                  {highlights.map((item, idx) => (
                    <div key={idx} className='flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100'>
                      <CheckCircle2 size={18} className='text-red-500 shrink-0 mt-0.5' />
                      <p className='text-xs sm:text-sm font-semibold text-gray-800'>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className='space-y-4'>
                <h3 className='text-lg font-bold text-gray-900'>Technical Specifications</h3>
                <div className='rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-300 text-sm'>
                  {specs.map((spec, idx) => (
                    <div key={idx} className={`grid grid-cols-1 sm:grid-cols-3 p-4 ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                      <span className='font-bold text-gray-700 sm:col-span-1'>{spec.label}</span>
                      <span className='text-gray-900 font-medium sm:col-span-2 mt-1 sm:mt-0'>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className='space-y-6'>
                <div className='flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100'>
                  <div className='text-center sm:text-left'>
                    <div className='text-4xl font-black text-gray-900'>{rating}</div>
                    <div className='flex items-center gap-1 text-amber-400 my-1 justify-center sm:justify-start'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className='fill-amber-400' />
                      ))}
                    </div>
                    <p className='text-xs text-gray-500 font-medium'>Based on {reviewsCount} verified reviews</p>
                  </div>

                  <div className='w-full max-w-xs space-y-1.5 text-xs text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <span>5 ★</span>
                      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                        <div className='bg-amber-400 h-2 w-[85%]'></div>
                      </div>
                      <span>85%</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span>4 ★</span>
                      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                        <div className='bg-amber-400 h-2 w-[60%]'></div>
                      </div>
                      <span>60%</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span>3 ★</span>
                      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                        <div className='bg-amber-400 h-2 w-[10%]'></div>
                      </div>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Sample Review Cards */}
                <div className='space-y-4'>
                  <div className='p-4 rounded-xl border border-gray-100 bg-white space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='font-bold text-gray-900'>Alex M. (Verified Buyer)</span>
                      <span className='text-gray-400'>2 days ago</span>
                    </div>
                    <div className='flex text-amber-400'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className='fill-amber-400' />
                      ))}
                    </div>
                    <p className='text-xs sm:text-sm text-gray-700'>
                      "Exceptional build quality and blazingly fast delivery from Volt Vibe! Exceeded my expectations."
                    </p>
                  </div>

                  <div className='p-4 rounded-xl border border-gray-100 bg-white space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='font-bold text-gray-900'>Samantha K. (Verified Buyer)</span>
                      <span className='text-gray-400'>1 week ago</span>
                    </div>
                    <div className='flex text-amber-400'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className='fill-amber-400' />
                      ))}
                    </div>
                    <p className='text-xs sm:text-sm text-gray-700'>
                      "Works like a charm. Packaging was super secure and setup took less than 5 minutes."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className='space-y-4 text-gray-700 text-xs sm:text-sm leading-relaxed'>
                <h3 className='text-lg font-bold text-gray-900'>Shipping & Return Information</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2'>
                    <h4 className='font-bold text-gray-900 flex items-center gap-2'>
                      <Truck size={16} className='text-red-500' /> Express Shipping
                    </h4>
                    <p className='text-xs text-gray-600'>
                      Standard orders are processed within 24 hours. Express delivery usually arrives in 2-4 business days.
                    </p>
                  </div>

                  <div className='p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2'>
                    <h4 className='font-bold text-gray-900 flex items-center gap-2'>
                      <RotateCcw size={16} className='text-emerald-500' /> Hassle-Free Returns
                    </h4>
                    <p className='text-xs text-gray-600'>
                      Return any item in its original condition within 30 days for a full refund or exchange.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className='space-y-6 pt-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900'>
                Related Products in {product.category}
              </h2>
              <Link to='/products' className='text-xs font-bold text-red-500 hover:text-red-600 transition'>
                View All →
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add to Cart Toast Notification */}
      {showToast && (
        <div className='fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-white border border-emerald-200 p-4 rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-emerald-500/20 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm'>
          <img 
            src={product.imageUrl || product.image} 
            alt={product.title} 
            className='w-12 h-12 object-contain bg-gray-50 rounded-xl p-1 border border-gray-100' 
          />
          <div className='flex flex-col flex-1 min-w-0'>
            <div className='flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider'>
              <IoCheckmarkCircle className='w-4 h-4' /> Added to Cart!
            </div>
            <p className='font-bold text-gray-900 text-sm truncate mt-0.5'>{product.title}</p>
            <p className='text-xs text-gray-500 font-semibold'>${product.price} × {quantity}</p>
          </div>
          <button 
            onClick={() => navigate('/cart')}
            className='bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3.5 py-2 rounded-full transition shadow-md shadow-red-500/25 active:scale-95 shrink-0 cursor-pointer'
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

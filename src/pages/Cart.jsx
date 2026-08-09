import React from 'react';
import { Link } from 'react-router-dom';
import useCartLogic from '../hooks/useCartLogic';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  RotateCcw, 
  Tag, 
  CheckCircle,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const Cart = () => {
  const {
    cart,
    totalItems,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    remainingForFreeShipping,
    shippingProgress,
    tax,
    discountAmount,
    grandTotal,
    promoCode,
    setPromoCode,
    promoMessage,
    discountRate,
    isCheckoutModalOpen,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    handleApplyPromo,
    handleCheckout,
    handleCloseModal,
    handleModalContinueShopping,
  } = useCartLogic();

  return (
    <div className='min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Empty Cart Section */}
        {cart.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
            <div className='relative mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-50 text-red-500 ring-8 ring-red-50/50 shadow-inner'>
              <ShoppingBag size={56} className='stroke-[1.5]' />
              <div className='absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100'>
                <Sparkles size={20} className='text-amber-500' />
              </div>
            </div>

            <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl mb-3'>
              Your Cart is Empty
            </h2>
            <p className='max-w-md text-gray-600 mb-8 text-base leading-relaxed'>
              Looks like you haven't added anything to your cart yet. Explore our top gear and electrical innovations to find your vibe!
            </p>

            <Link
              to='/products'
              className='inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0'
            >
              Explore Products <ArrowRight size={18} />
            </Link>

            {/* Empty Cart Feature Highlights */}
            <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl'>
              <div className='flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-black shadow-md'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500'>
                  <Truck size={24} />
                </div>
                <div className='text-left'>
                  <h4 className='font-bold text-gray-900 text-sm'>Free Shipping</h4>
                  <p className='text-xs text-gray-500'>On orders over ${freeShippingThreshold}</p>
                </div>
              </div>

              <div className='flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-black shadow-md'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500'>
                  <ShieldCheck size={24} />
                </div>
                <div className='text-left'>
                  <h4 className='font-bold text-gray-900 text-sm'>Secure Payment</h4>
                  <p className='text-xs text-gray-500'>100% encrypted transactions</p>
                </div>
              </div>

              <div className='flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-black shadow-md'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500'>
                  <RotateCcw size={24} />
                </div>
                <div className='text-left'>
                  <h4 className='font-bold text-gray-900 text-sm'>30 Days Return</h4>
                  <p className='text-xs text-gray-500'>Hassle-free guarantee</p>
                </div>
              </div>

              <div className='flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-black shadow-md'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500'>
                  <Headphones size={24} />
                </div>
                <div className='text-left'>
                  <h4 className='font-bold text-gray-900 text-sm'>24/7 Support</h4>
                  <p className='text-xs text-gray-500'>Dedicated expert assistance</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Cart Section */
          <div>
            {/* Top Bar Header */}
            <div className='flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-300'>
              <div>
                <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3'>
                  Shopping Cart
                  <span className='rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600'>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </h1>
                <p className='text-sm text-gray-500 mt-1'>Review items in your cart and proceed to checkout</p>
              </div>

              <div className='flex items-center gap-3'>
                <Link
                  to='/products'
                  className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition'
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>

                <button
                  onClick={clearCart}
                  className='inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition cursor-pointer'
                >
                  <Trash2 size={16} /> Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Layout Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
              
              {/* Left Column: Cart Items List */}
              <div className='lg:col-span-2 space-y-4'>
                {cart.map((product) => {
                  const qty = product.quantity || 1;
                  const itemTotal = product.price * qty;

                  return (
                    <div
                      key={product.id}
                      className='flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all'
                    >
                      {/* Product Image & Info */}
                      <div className='flex items-center gap-4 w-full sm:w-auto'>
                        <div className='flex size-24 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 p-2 overflow-hidden'>
                          <img
                            src={product.imageUrl || product.image}
                            alt={product.title}
                            className='h-full w-full object-contain transition-transform duration-300 hover:scale-105'
                          />
                        </div>

                        <div className='flex flex-col gap-1 max-w-xs'>
                          {product.category && (
                            <span className='w-max rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600 uppercase tracking-wider'>
                              {product.category}
                            </span>
                          )}
                          <h3 className='font-bold text-gray-900 text-base line-clamp-1'>
                            {product.title}
                          </h3>
                          <p className='text-xs text-gray-500 line-clamp-1'>
                            {product.description}
                          </p>
                          <span className='font-bold text-gray-800 text-sm mt-1 sm:hidden'>
                            ${product.price} each
                          </span>
                        </div>
                      </div>

                      {/* Right side controls: Price, Quantity, Subtotal & Remove */}
                      <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100'>
                        
                        {/* Price per unit (Desktop) */}
                        <div className='hidden sm:block text-right'>
                          <span className='text-xs text-gray-400 block'>Price</span>
                          <span className='font-bold text-gray-700 text-sm'>
                            ${product.price}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className='flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 p-1'>
                          <button
                            onClick={() => decrementQuantity(product.id)}
                            className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer'
                            aria-label='Decrease quantity'
                          >
                            <Minus size={14} />
                          </button>
                          <span className='w-8 text-center font-bold text-sm text-gray-800'>
                            {qty}
                          </span>
                          <button
                            onClick={() => incrementQuantity(product.id)}
                            className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer'
                            aria-label='Increase quantity'
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item Total Subtotal */}
                        <div className='text-right min-w-[70px]'>
                          <span className='text-xs text-gray-400 block sm:hidden'>Total</span>
                          <span className='font-bold text-red-500 text-base sm:text-lg'>
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className='p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition cursor-pointer'
                          title='Remove item'
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Order Summary */}
              <div className='lg:col-span-1 sticky top-24'>
                <div className='rounded-2xl bg-white p-6 border border-gray-200 shadow-sm space-y-6'>
                  <h3 className='text-xl font-bold text-gray-900 border-b border-gray-100 pb-4'>
                    Order Summary
                  </h3>

                  {/* Free Shipping Progress Indicator */}
                  <div className='rounded-xl bg-gray-50 p-4 border border-gray-100 space-y-2'>
                    <div className='flex items-center justify-between text-xs font-semibold text-gray-700'>
                      <span className='flex items-center gap-1.5'>
                        <Truck size={15} className='text-red-500' />
                        {remainingForFreeShipping > 0 ? 'Free Shipping Progress' : 'Free Shipping Unlocked! 🎉'}
                      </span>
                      <span>{shippingProgress.toFixed(0)}%</span>
                    </div>

                    <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                      <div
                        className='bg-red-500 h-2 rounded-full transition-all duration-500'
                        style={{ width: `${shippingProgress}%` }}
                      ></div>
                    </div>

                    {remainingForFreeShipping > 0 ? (
                      <p className='text-xs text-gray-500'>
                        Add <span className='font-bold text-gray-800'>${remainingForFreeShipping.toFixed(2)}</span> more to qualify for FREE Shipping!
                      </p>
                    ) : (
                      <p className='text-xs text-emerald-600 font-medium'>
                        Congratulations! You qualify for Free Delivery.
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between text-gray-600'>
                      <span>Subtotal</span>
                      <span className='font-semibold text-gray-900'>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className='flex justify-between text-gray-600'>
                      <span>Shipping Fee</span>
                      <span className='font-semibold text-gray-900'>
                        {shippingFee === 0 ? (
                          <span className='text-emerald-600 font-bold'>FREE</span>
                        ) : (
                          `$${shippingFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className='flex justify-between text-gray-600'>
                      <span>Estimated Tax (5%)</span>
                      <span className='font-semibold text-gray-900'>${tax.toFixed(2)}</span>
                    </div>

                    {discountRate > 0 && (
                      <div className='flex justify-between text-emerald-600 font-medium'>
                        <span>Discount ({discountRate * 100}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className='border-t border-gray-100 pt-3 flex justify-between items-center'>
                      <span className='text-base font-bold text-gray-900'>Total Amount</span>
                      <span className='text-2xl font-extrabold text-red-500'>
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className='w-full flex items-center justify-center gap-2 rounded-full bg-red-500 py-3.5 px-4 font-bold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600 hover:shadow-red-500/40 active:scale-[0.99] cursor-pointer'
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>

                  {/* Trust Guarantees */}
                  <div className='pt-2 border-t border-gray-100 flex items-center justify-center gap-6 text-gray-400 text-xs'>
                    <span className='flex items-center gap-1'>
                      <ShieldCheck size={14} className='text-emerald-500' /> Secure Checkout
                    </span>
                    <span className='flex items-center gap-1'>
                      <Truck size={14} className='text-blue-500' /> Fast Dispatch
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Simulated Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
          <div className='w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 text-center space-y-4'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600'>
              <CheckCircle size={36} />
            </div>
            
            <h3 className='text-2xl font-bold text-gray-900'>Order Placed Successfully!</h3>
            <p className='text-sm text-gray-600'>
              Thank you for shopping with <span className='font-bold text-red-500'>Volt Vibe</span>! Your order total of <span className='font-bold text-gray-900'>${grandTotal.toFixed(2)}</span> has been confirmed.
            </p>

            <div className='rounded-2xl bg-gray-50 p-4 text-left text-xs space-y-1 border border-gray-100 text-gray-600'>
              <div className='flex justify-between'>
                <span>Total Items:</span>
                <span className='font-semibold text-gray-800'>{totalItems}</span>
              </div>
              <div className='flex justify-between'>
                <span>Estimated Delivery:</span>
                <span className='font-semibold text-emerald-600'>2-4 Business Days</span>
              </div>
            </div>

            <div className='pt-2 flex flex-col gap-2'>
              <button
                onClick={handleModalContinueShopping}
                className='w-full rounded-full bg-red-500 py-3 font-bold text-white hover:bg-red-600 transition cursor-pointer'
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCloseModal}
                className='w-full rounded-full border border-gray-200 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer'
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
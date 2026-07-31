import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Zap, 
  Building2, 
  Smartphone, 
  DollarSign, 
  Check, 
  Loader2,
  Home,
  ShoppingBag
} from 'lucide-react';
import useCheckoutLogic from '../hooks/useCheckoutLogic';

const Checkout = () => {
  const {
    checkoutItems,
    isDirectPurchase,
    totalItems,
    subtotal,
    shippingFee,
    tax,
    discountAmount,
    grandTotal,
    formData,
    formErrors,
    handleInputChange,
    paymentMethod,
    setPaymentMethod,
    cardDetails,
    handleCardInputChange,
    promoCode,
    setPromoCode,
    promoMessage,
    handleApplyPromo,
    isProcessing,
    isOrderPlaced,
    placedOrderInfo,
    handlePlaceOrder,
    handleContinueShopping,
    handleGoHome,
    navigate,
  } = useCheckoutLogic();

  if (isOrderPlaced && placedOrderInfo) {
    return (
      <div className='min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <div className='w-full max-w-lg bg-white rounded-3xl p-8 border border-gray-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300'>
          <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50'>
            <CheckCircle2 size={48} />
          </div>

          <div>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-100 uppercase tracking-wider mb-2'>
              <Sparkles size={14} /> Order Confirmed
            </span>
            <h1 className='text-3xl font-extrabold text-gray-900'>Thank You for Your Order!</h1>
            <p className='text-sm text-gray-500 mt-1'>
              We have received your order <span className='font-mono font-bold text-gray-900'>{placedOrderInfo.orderId}</span>.
            </p>
          </div>

          {/* Purchased Items List */}
          <div className='rounded-2xl bg-gray-50 p-4 border border-gray-100 text-left space-y-3 max-h-48 overflow-y-auto'>
            <h4 className='text-xs font-bold text-gray-700 uppercase tracking-wider'>Items Ordered ({totalItems})</h4>
            <div className='divide-y divide-gray-200/60'>
              {placedOrderInfo.items.map((item, idx) => (
                <div key={idx} className='py-2 flex items-center justify-between gap-3 text-xs'>
                  <div className='flex items-center gap-2.5 truncate'>
                    <img 
                      src={item.imageUrl || item.image} 
                      alt={item.title} 
                      className='w-9 h-9 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0' 
                    />
                    <div className='truncate'>
                      <p className='font-bold text-gray-900 truncate'>{item.title}</p>
                      <p className='text-gray-500'>Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className='font-bold text-gray-900 shrink-0'>${((item.price) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className='rounded-2xl bg-gray-50 p-4 border border-gray-100 text-left text-xs space-y-2 text-gray-600'>
            <div className='flex justify-between border-b border-gray-200/60 pb-2'>
              <span>Delivery Address:</span>
              <span className='font-semibold text-gray-900 text-right max-w-50 truncate'>
                {placedOrderInfo.shippingAddress.address}, {placedOrderInfo.shippingAddress.city}
              </span>
            </div>
            <div className='flex justify-between border-b border-gray-200/60 pb-2'>
              <span>Payment Method:</span>
              <span className='font-semibold text-gray-900 uppercase'>{placedOrderInfo.paymentMethod}</span>
            </div>
            <div className='flex justify-between pt-1 text-sm font-bold text-gray-900'>
              <span>Total Paid:</span>
              <span className='text-red-500'>${placedOrderInfo.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className='pt-2 flex flex-col sm:flex-row gap-3'>
            <button
              onClick={handleGoHome}
              className='w-full inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3.5 px-6 font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-sm'
            >
              <Home size={18} /> Return to Home Page
            </button>
            <button
              onClick={handleContinueShopping}
              className='w-full inline-flex items-center justify-center gap-2 rounded-full bg-red-500 py-3.5 px-6 font-bold text-white shadow-lg shadow-red-500/25 hover:bg-red-600 transition cursor-pointer'
            >
              <ShoppingBag size={18} /> Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        
        {/* Navigation & Header */}
        <div className='flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4'>
          <div>
            <nav className='flex items-center gap-2 text-xs text-gray-500 mb-1'>
              <Link to='/' className='hover:text-red-500 transition'>Home</Link>
              <span>/</span>
              <Link to='/products' className='hover:text-red-500 transition'>Products</Link>
              <span>/</span>
              <span className='font-bold text-gray-900'>Checkout</span>
            </nav>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3'>
              Checkout
              {isDirectPurchase && (
                <span className='inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200'>
                  <Zap size={14} className='text-amber-600' /> Express Buy Now
                </span>
              )}
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer'
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {checkoutItems.length === 0 ? (
          /* Empty Checkout / Session Expired Screen */
          <div className='text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 space-y-6 max-w-lg mx-auto shadow-sm animate-in fade-in duration-300'>
            <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 ring-8 ring-red-50/50 shadow-inner'>
              <ShoppingBag size={40} className='stroke-[1.5]' />
            </div>

            <div className='space-y-2'>
              <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
                No Active Checkout Items
              </h2>
              <p className='text-gray-500 text-sm leading-relaxed max-w-md mx-auto'>
                Your checkout session is currently empty or your order has already been completed. Choose where you would like to go next:
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 pt-4 justify-center'>
              <button
                onClick={handleGoHome}
                className='inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer'
              >
                <Home size={18} /> Return to Home Page
              </button>
              <button
                onClick={handleContinueShopping}
                className='inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-500/25 hover:bg-red-600 transition cursor-pointer'
              >
                <ShoppingBag size={18} /> Browse Products
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            
            {/* Left Column: Form & Payment Details (8 cols) */}
            <div className='lg:col-span-7 space-y-6'>
              
              {/* Section 1: Shipping Information */}
              <div className='bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 font-bold'>
                    1
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>Shipping Address</h3>
                    <p className='text-xs text-gray-500'>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Full Name */}
                  <div className='sm:col-span-2'>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder='Mangalam Kumar'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.fullName && <p className='text-xs text-red-500 mt-1'>{formErrors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='mag@example.com'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.email && <p className='text-xs text-red-500 mt-1'>{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={10}
                      placeholder='9876543210'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.phone && <p className='text-xs text-red-500 mt-1'>{formErrors.phone}</p>}
                  </div>

                  {/* Street Address */}
                  <div className='sm:col-span-2'>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      Street Address *
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder='Plot No. 42, MG Road, Sector 15'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.address ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.address && <p className='text-xs text-red-500 mt-1'>{formErrors.address}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      City *
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder='New Delhi'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.city ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.city && <p className='text-xs text-red-500 mt-1'>{formErrors.city}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      State / Province *
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder='Delhi'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.state ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.state && <p className='text-xs text-red-500 mt-1'>{formErrors.state}</p>}
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      ZIP / PIN Code *
                    </label>
                    <input
                      type='text'
                      name='zip'
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder='110001'
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
                        formErrors.zip ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                    {formErrors.zip && <p className='text-xs text-red-500 mt-1'>{formErrors.zip}</p>}
                  </div>

                  {/* Country */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                      Country
                    </label>
                    <input
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none'
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className='bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 font-bold'>
                    2
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>Payment Method</h3>
                    <p className='text-xs text-gray-500'>All transactions are 256-bit encrypted and secure.</p>
                  </div>
                </div>

                {/* Method Options */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / NetBank', icon: Smartphone },
                    { id: 'paypal', label: 'PayPal', icon: Building2 },
                    { id: 'cod', label: 'Cash on Delivery', icon: DollarSign },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type='button'
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition cursor-pointer text-center gap-2 ${
                          isSelected
                            ? 'border-red-500 bg-red-50/50 text-red-600 ring-2 ring-red-500/20 font-bold'
                            : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} className={isSelected ? 'text-red-500' : 'text-gray-500'} />
                        <span className='text-xs'>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Card Input Fields if 'card' selected */}
                {paymentMethod === 'card' && (
                  <div className='rounded-2xl bg-gray-50 p-4 border border-gray-200/80 space-y-4 animate-in fade-in duration-200'>
                    <div>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                        Card Number *
                      </label>
                      <input
                        type='text'
                        name='cardNumber'
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder='4532 •••• •••• 8900'
                        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition ${
                          formErrors.cardNumber ? 'border-red-500' : 'border-gray-200 focus:border-red-500'
                        }`}
                      />
                      {formErrors.cardNumber && <p className='text-xs text-red-500 mt-1'>{formErrors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                        Cardholder Name *
                      </label>
                      <input
                        type='text'
                        name='cardHolder'
                        value={cardDetails.cardHolder}
                        onChange={handleCardInputChange}
                        placeholder='MANGALAM KUMAR'
                        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition ${
                          formErrors.cardHolder ? 'border-red-500' : 'border-gray-200 focus:border-red-500'
                        }`}
                      />
                      {formErrors.cardHolder && <p className='text-xs text-red-500 mt-1'>{formErrors.cardHolder}</p>}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                          Expiry Date *
                        </label>
                        <input
                          type='text'
                          name='expiry'
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          placeholder='MM/YY'
                          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition ${
                            formErrors.expiry ? 'border-red-500' : 'border-gray-200 focus:border-red-500'
                          }`}
                        />
                        {formErrors.expiry && <p className='text-xs text-red-500 mt-1'>{formErrors.expiry}</p>}
                      </div>

                      <div>
                        <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                          CVV / CVC *
                        </label>
                        <input
                          type='password'
                          name='cvv'
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          maxLength={4}
                          placeholder='123'
                          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition ${
                            formErrors.cvv ? 'border-red-500' : 'border-gray-200 focus:border-red-500'
                          }`}
                        />
                        {formErrors.cvv && <p className='text-xs text-red-500 mt-1'>{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className='rounded-2xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-xs space-y-1'>
                    <p className='font-bold'>Cash on Delivery Selected</p>
                    <p className='text-amber-700'>Pay with cash or card upon product arrival at your shipping location.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary & Placement (5 cols) */}
            <div className='lg:col-span-5 sticky top-24 space-y-6'>
              <div className='bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6'>
                <h3 className='text-xl font-bold text-gray-900 border-b border-gray-100 pb-4'>
                  Order Summary ({totalItems})
                </h3>

                {/* Items List */}
                <div className='divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1 space-y-3'>
                  {checkoutItems.map((item) => {
                    const qty = item.quantity || 1;
                    return (
                      <div key={item.id} className='pt-3 first:pt-0 flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-3 truncate'>
                          <div className='h-12 w-12 shrink-0 rounded-xl bg-gray-50 p-1 border border-gray-100 flex items-center justify-center'>
                            <img src={item.imageUrl || item.image} alt={item.title} className='max-h-full max-w-full object-contain' />
                          </div>
                          <div className='truncate'>
                            <p className='text-xs font-bold text-gray-900 truncate'>{item.title}</p>
                            <p className='text-[11px] text-gray-500'>Qty: {qty} × ${item.price}</p>
                          </div>
                        </div>
                        <span className='font-bold text-gray-900 text-xs shrink-0'>
                          ${(item.price * qty).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Form */}
                <div className='pt-2 border-t border-gray-100 space-y-2'>
                  <label className='text-xs font-semibold text-gray-600 flex items-center gap-1'>
                    <Tag size={13} className='text-red-500' /> Apply Coupon Code
                  </label>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder='VOLT10 or VOLT20'
                      className='w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-red-500'
                    />
                    <button
                      type='button'
                      onClick={handleApplyPromo}
                      className='rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition cursor-pointer shrink-0'
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage.text && (
                    <p className={`text-xs font-medium ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Price Calculation */}
                <div className='space-y-3 text-xs border-t border-gray-100 pt-4 text-gray-600'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span className='font-semibold text-gray-900'>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Shipping Fee</span>
                    <span className='font-semibold text-gray-900'>
                      {shippingFee === 0 ? <span className='text-emerald-600 font-bold'>FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Estimated Tax (5%)</span>
                    <span className='font-semibold text-gray-900'>${tax.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className='flex justify-between text-emerald-600 font-medium'>
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className='border-t border-gray-100 pt-3 flex justify-between items-center text-sm font-bold text-gray-900'>
                    <span>Total Amount</span>
                    <span className='text-2xl font-extrabold text-red-500'>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isProcessing}
                  className='w-full flex items-center justify-center gap-2 rounded-full bg-red-500 py-4 px-6 font-bold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600 hover:shadow-red-500/40 active:scale-[0.99] disabled:opacity-75 cursor-pointer text-base'
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> Processing Order...
                    </>
                  ) : (
                    <>
                      <Lock size={18} /> Place Order Now (${grandTotal.toFixed(2)})
                    </>
                  )}
                </button>

                {/* Guarantees */}
                <div className='pt-2 border-t border-gray-100 flex items-center justify-center gap-4 text-gray-400 text-[11px]'>
                  <span className='flex items-center gap-1'>
                    <ShieldCheck size={14} className='text-emerald-500' /> Encrypted Checkout
                  </span>
                  <span className='flex items-center gap-1'>
                    <Truck size={14} className='text-blue-500' /> Express Delivery
                  </span>
                </div>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default Checkout;

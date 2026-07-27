import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartSlice';

const useCartLogic = () => {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Take out data from cart variable & calculate totals
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Free shipping threshold ($500)
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const tax = subtotal * 0.05; // 5% estimated tax
  const discountAmount = subtotal * discountRate;
  const grandTotal = subtotal + shippingFee + tax - discountAmount;

  // Cart actions
  const addToCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  const removeFromCart = (id) => {
    dispatch(cartActions.removeToCart(id));
  };

  const incrementQuantity = (id) => {
    dispatch(cartActions.incrementQuantity(id));
  };

  const decrementQuantity = (id) => {
    dispatch(cartActions.decrementQuantity(id));
  };

  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'VOLT10') {
      setDiscountRate(0.1);
      setPromoMessage({ text: '10% discount applied successfully!', type: 'success' });
    } else if (cleanCode === 'VOLT20') {
      setDiscountRate(0.2);
      setPromoMessage({ text: '20% discount applied successfully!', type: 'success' });
    } else if (cleanCode === 'MAG40') {
      setDiscountRate(0.4);
      setPromoMessage({ text: 'congratulations! you got a special discount from our owner MAGALAM.', type: 'success' });
    } else {
      setDiscountRate(0);
      setPromoMessage({ text: 'Invalid promo code. Try "VOLT10" or "VOLT20"', type: 'error' });
    }
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
  };

  const handleModalContinueShopping = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
    navigate('/products');
  };

  return {
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
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    handleApplyPromo,
    handleCheckout,
    handleCloseModal,
    handleModalContinueShopping,
  };
};

export default useCartLogic;

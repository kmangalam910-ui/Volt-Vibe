import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartSlice';

const useCheckoutLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Manage direct item locally so it can be cleared when order is placed
  const [activeDirectItem, setActiveDirectItem] = useState(
    location.state?.directItem || null
  );

  const isDirectPurchase = Boolean(activeDirectItem);

  // Redux Cart items fallback if not a direct item purchase
  const cartItems = useSelector((state) => state.cart || []);

  // Final items list being checked out
  const checkoutItems = isDirectPurchase ? [activeDirectItem] : cartItems;

  // Form input states for Shipping
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
  });

  const [formErrors, setFormErrors] = useState({});

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'cod' | 'paypal'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  // Order processing & success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  // Financial Calculations
  const totalItems = checkoutItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const tax = subtotal * 0.05; // 5% tax
  const discountAmount = subtotal * discountRate;
  const grandTotal = subtotal + shippingFee + tax - discountAmount;

  // Handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Promo Code handling
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
      setPromoMessage({ text: '40% Special VIP discount applied!', type: 'success' });
    } else {
      setDiscountRate(0);
      setPromoMessage({ text: 'Invalid promo code. Try "VOLT10" or "VOLT20"', type: 'error' });
    }
  };

  // Input Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address format';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State / Province is required';
    if (!formData.zip.trim()) errors.zip = 'ZIP / Postal code is required';

    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      if (!cardDetails.cardHolder.trim()) errors.cardHolder = 'Cardholder name is required';
      if (!cardDetails.expiry.trim()) errors.expiry = 'Expiry date is required';
      if (!cardDetails.cvv.trim()) errors.cvv = 'CVV is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Place Order submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (checkoutItems.length === 0) return;

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `VV-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSummary = {
        orderId: generatedOrderId,
        items: checkoutItems,
        totalItems,
        grandTotal,
        shippingAddress: { ...formData },
        paymentMethod,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      setPlacedOrderInfo(orderSummary);
      setIsProcessing(false);
      setIsOrderPlaced(true);

      // Clear direct purchase item state and replace browser history state so back button shows empty state
      setActiveDirectItem(null);
      if (typeof window !== 'undefined' && window.history.replaceState) {
        window.history.replaceState(null, '');
      }

      // If completing order from Cart (not direct purchase), clear cart in Redux
      if (!isDirectPurchase) {
        dispatch(cartActions.clearCart());
      }
    }, 1500);
  };

  const handleContinueShopping = () => {
    setActiveDirectItem(null);
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '');
    }
    navigate('/products');
  };

  const handleGoHome = () => {
    setActiveDirectItem(null);
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '');
    }
    navigate('/');
  };

  return {
    checkoutItems,
    isDirectPurchase,
    totalItems,
    subtotal,
    freeShippingThreshold,
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
  };
};

export default useCheckoutLogic;

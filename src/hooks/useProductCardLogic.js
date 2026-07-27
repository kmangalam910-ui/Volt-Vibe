import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';

const useProductCardLogic = (product) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef(null);

  const handleAddToCart = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // Dispatch to Redux cart
    dispatch(cartActions.addToCart(product));

    // Show button active state & popup toast
    setIsAdded(true);
    setShowToast(true);

    // Clear existing timeout if user clicks rapidly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Auto dismiss after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
      setShowToast(false);
    }, 3000);
  };

  const handleViewProduct = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product && product.id) {
      navigate(`/products/${product.id}`);
    }
  };

  const handleViewCart = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/cart');
  };

  return {
    isAdded,
    showToast,
    handleAddToCart,
    handleViewProduct,
    handleViewCart,
  };
};

export default useProductCardLogic;

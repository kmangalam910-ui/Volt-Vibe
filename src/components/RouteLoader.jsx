import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageSkeleton from './PageSkeleton';

const getSkeletonType = (pathname) => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/products/')) return 'product-details';
  if (pathname === '/products') return 'products';
  if (pathname === '/cart') return 'cart';
  if (pathname === '/checkout') return 'checkout';
  return 'generic';
};

const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const prevPath = useRef(null);

  useEffect(() => {
    // Show skeleton on initial page load and every route change
    setIsLoading(true);
    prevPath.current = location.pathname;

    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <PageSkeleton type={getSkeletonType(location.pathname)} />;
  }

  return children;
};

export default RouteLoader;

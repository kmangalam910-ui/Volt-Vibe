import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/react';
import gsap from 'gsap';
import useAddressLogic from './useAddressLogic';
import useLocationLogic from './useLocationLogic';

const useNavbarLogic = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { location, getLocation, openDropdown, setOpenDropdown } = useLocationLogic();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenuArrowPrompt, setShowMenuArrowPrompt] = useState(true);

  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

  const cart = useSelector((state) => state.cart || []);
  const totalCartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const {
    manualAddress,
    setManualAddress,
    locationText,
    toggleDropdown,
    closeDropdown,
    getShowLocation,
    handleManualAddress,
    isLoading,
  } = useAddressLogic({ location, getLocation, setOpenDropdown, openDropdown });

  // Hide animated menu arrow prompt on mobile after ~3.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenuArrowPrompt(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // GSAP animation for mobile sidebar & backdrop
  useEffect(() => {
    if (!sidebarRef.current || !backdropRef.current) return;

    if (isMobileMenuOpen) {
      gsap.set(backdropRef.current, { display: 'block', opacity: 0 });
      gsap.set(sidebarRef.current, { display: 'block', x: '-100%' });

      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(backdropRef.current, { display: 'none' });
        },
      });
      gsap.to(sidebarRef.current, {
        x: '-100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(sidebarRef.current, { display: 'none' });
        },
      });
    }
  }, [isMobileMenuOpen]);

  // Handle window resize to automatically close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setShowMenuArrowPrompt(false);
  };

  return {
    isLoaded,
    isSignedIn,
    totalCartCount,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    showMenuArrowPrompt,
    sidebarRef,
    backdropRef,

    // Address & Location Logic
    openDropdown,
    manualAddress,
    setManualAddress,
    locationText,
    toggleDropdown,
    closeDropdown,
    getShowLocation,
    handleManualAddress,
    isLoading,
  };
};

export default useNavbarLogic;

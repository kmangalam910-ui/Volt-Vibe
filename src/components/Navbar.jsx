import { MapPin, Search, Menu, ShoppingBag } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SignInButton, UserButton, useAuth } from '@clerk/react';
import { FaCaretDown } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { NavLink, Link } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import gsap from 'gsap';
import useAddressLogic from '../hooks/useAddressLogic';
import Loader from './Loader';
import useLocationLogic from '../hooks/useLocationLogic';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { location, getLocation, openDropdown, setOpenDropdown } = useLocationLogic();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

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

  // Handle window resizing to close the mobile sidebar if the user scales up to desktop/tablet view
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

  return (
    <>
      <header className='sticky top-0 z-40 border-b border-gray-100 bg-white/95 py-4 shadow-sm backdrop-blur'>
        <div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <button
              type='button'
              onClick={() => setIsMobileMenuOpen(true)}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-red-500 hover:text-red-500 lg:hidden'
              aria-label='Open menu'
            >
              <Menu size={20} />
            </button>

            <Link to='/' className='flex items-center'>
              <h1 className='text-2xl font-bold sm:text-3xl'>
                <span className='text-red-500'>V</span>olt <span className='text-red-500'>V</span>ibe
              </h1>
            </Link>
          </div>

          <div className='hidden items-center gap-5 lg:flex'>
            <div className='relative flex items-center gap-1 text-gray-700'>
              <MapPin className='text-red-500' />
              <span className='max-w-36 truncate font-semibold'>{locationText}</span>
              <button type='button' onClick={toggleDropdown} className='rounded-full p-1 transition-all duration-300 focus:rotate-180 hover:bg-gray-100'>
                <FaCaretDown />
              </button>

              {openDropdown ? (
                <div className='absolute left-0 top-full z-20 mt-3 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl'>
                  <div className='mb-4 flex items-center justify-between'>
                    <h1 className='text-lg font-semibold'>Add Your Address</h1>
                    <button onClick={closeDropdown} className='text-gray-500 transition hover:text-red-500'>
                      <CgClose />
                    </button>
                  </div>

                  <form onSubmit={handleManualAddress} className='mb-3 flex flex-col gap-2'>
                    <input
                      type='text'
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder='Enter your address'
                      className='rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-red-500'
                    />
                    <button type='submit' disabled={isLoading} className='flex items-center justify-center gap-2 cursor-pointer rounded-full bg-red-500 px-4 py-1 text-white transition hover:bg-red-400 disabled:opacity-60'>
                      {isLoading ? <Loader size={4} label='Saving' /> : 'Save Address'}
                    </button>
                  </form>

                  <div className='border-t border-gray-100 pt-3'>
                    <button onClick={getShowLocation} disabled={isLoading} className='flex items-center justify-center gap-2 cursor-pointer rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 transition hover:bg-gray-200 disabled:opacity-60'>
                      {isLoading ? <Loader size={4} label='Detecting' /> : 'Detect Location'}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <nav className='flex items-center gap-6 font-semibold text-gray-700'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `${isActive ? 'text-red-500' : 'hover:text-red-500'} transition`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <Link to='/cart' className='relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200'>
              <IoCartOutline className='h-6 w-6' />
              <span className='absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white'>0</span>
            </Link>

            {!isLoaded ? null : isSignedIn ? (
              <UserButton afterSignOutUrl='/' />
            ) : (
              <SignInButton mode='modal'>
                <button className='rounded-full border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400'>Login</button>
              </SignInButton>
            )}
          </div>

          <div className='flex items-center gap-3 lg:hidden'>
            <Link to='/cart' className='relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200'>
              <ShoppingBag className='h-5 w-5' />
              <span className='absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white'>0</span>
            </Link>
          </div>
        </div>
      </header>

      <div
        ref={backdropRef}
        onClick={closeMobileMenu}
        className='fixed inset-0 z-50 hidden bg-black/40 lg:hidden'
      />

      <aside
        ref={sidebarRef}
        className='fixed left-0 top-0 z-50 hidden h-full w-72 max-w-[85vw] border-r border-gray-200 bg-white p-5 shadow-2xl lg:hidden'
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'><span className='text-red-500'>V</span>olt <span className='text-red-500'>V</span>ibe</h2>
          <button type='button' onClick={closeMobileMenu} className='rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-red-500'>
            <CgClose size={20} />
          </button>
        </div>

        <div className='mt-6 flex flex-col gap-3'>

          <div className='relative rounded-2xl border border-gray-200 bg-gray-50 p-3'>
            <div className='flex items-center gap-2 text-gray-700'>
              <MapPin className='text-red-500' />
              <span className='text-sm font-semibold'>{locationText}</span>
            </div>
            <button onClick={toggleDropdown} className='mt-3 w-full rounded-full bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-400'>Update address</button>

            {openDropdown ? (
              <div className='absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-xl'>
                <div className='mb-4 flex items-center justify-between'>
                  <h1 className='text-lg font-semibold'>Add Your Address</h1>
                  <button onClick={closeDropdown} className='text-gray-500 transition hover:text-red-500'>
                    <CgClose />
                  </button>
                </div>

                <form onSubmit={handleManualAddress} className='mb-3 flex flex-col gap-2'>
                  <input
                    type='text'
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder='Enter your address'
                    className='rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-red-500'
                  />
                    <button type='submit' disabled={isLoading} className='flex items-center justify-center gap-2 cursor-pointer rounded-full bg-red-500 px-4 py-1 text-white transition hover:bg-red-400 disabled:opacity-60'>
                      {isLoading ? <Loader size={4} label='Saving' /> : 'Save Address'}
                    </button>
                </form>

                  <div className='border-t border-gray-100 pt-3'>
                    <button onClick={getShowLocation} disabled={isLoading} className='flex items-center justify-center gap-2 cursor-pointer rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 transition hover:bg-gray-200 disabled:opacity-60'>
                      {isLoading ? <Loader size={4} label='Detecting' /> : 'Detect Location'}
                    </button>
                  </div>
              </div>
            ) : null}
          </div>

          <nav className='mt-2 flex flex-col gap-2'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) => `${isActive ? 'bg-red-50 text-red-500' : 'text-gray-700 hover:bg-gray-100'} rounded-xl px-3 py-3 font-semibold transition`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='mt-4 rounded-2xl border border-gray-200 p-3'>
            {!isLoaded ? null : isSignedIn ? (
              <div className='flex items-center justify-between'>
                <span className='text-sm font-semibold text-gray-700'>Account</span>
                <UserButton afterSignOutUrl='/' />
              </div>
            ) : (
              <SignInButton mode='modal'>
                <button className='w-full rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400'>Login</button>
              </SignInButton>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
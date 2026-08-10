import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MapPin, Menu, ShoppingBag, ArrowLeft, ChevronDown, X, Navigation } from 'lucide-react';
import { IoCartOutline } from 'react-icons/io5';
import { SignInButton, UserButton } from '@clerk/react';
import useNavbarLogic from '../hooks/useNavbarLogic';
import Loader from './Loader';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const {
    isLoaded,
    isSignedIn,
    totalCartCount,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    showMenuArrowPrompt,
    sidebarRef,
    backdropRef,
    // Address logic
    openDropdown,
    manualAddress,
    setManualAddress,
    locationText,
    toggleDropdown,
    closeDropdown,
    getShowLocation,
    handleManualAddress,
    isLoading,
  } = useNavbarLogic();

  return (
    <>
      <header className='sticky top-0 z-40 border-b border-gray-100 bg-white/95 py-3.5 shadow-sm backdrop-blur'>
        <div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            {/* Mobile Menu Toggle Button */}
            <div className='relative flex items-center lg:hidden'>
              <button
                type='button'
                onClick={openMobileMenu}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition cursor-pointer relative z-10 ${
                  showMenuArrowPrompt
                    ? 'border-red-500 text-red-500 ring-4 ring-red-500/30 animate-pulse'
                    : 'border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
                aria-label='Open menu'
              >
                <Menu size={20} />
              </button>

              {/* Animated Arrow Prompt on Mobile */}
              {showMenuArrowPrompt && !isMobileMenuOpen && (
                <div className='absolute left-12 top-1/2 -translate-y-1/2 z-50 flex items-center gap-1.5 pointer-events-none animate-bounce'>
                  <div className='flex items-center gap-1 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-red-500/40 whitespace-nowrap border border-white/20'>
                    <ArrowLeft className='w-3.5 h-3.5 animate-pulse' />
                    <span>Open Menu!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Brand Logo */}
            <Link to='/' className='flex items-center'>
              <h1 className='text-2xl font-extrabold sm:text-3xl tracking-tight'>
                <span className='text-red-500'>V</span>olt <span className='text-red-500'>V</span>ibe
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation & Controls */}
          <div className='hidden items-center gap-6 lg:flex'>
            {/* Deliver To / Address Trigger & Dropdown */}
            <div className='relative'>
              <button
                type='button'
                onClick={toggleDropdown}
                className='group flex items-center gap-2.5 rounded-full border border-gray-200/80 bg-gray-50/80 px-3.5 py-1.5 text-xs text-gray-700 transition-all duration-300 hover:border-red-300 hover:bg-red-50/40 hover:shadow-sm cursor-pointer'
              >
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500 transition-transform group-hover:scale-110'>
                  <MapPin className='h-3.5 w-3.5' />
                </div>
                <div className='flex flex-col text-left leading-tight'>
                  <span className='text-[10px] font-medium text-gray-400 uppercase tracking-wider'>Deliver to</span>
                  <span className='max-w-[130px] truncate text-xs font-bold text-gray-800 group-hover:text-red-600 transition-colors'>
                    {locationText}
                  </span>
                </div>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-300 ${
                    openDropdown ? 'rotate-180 text-red-500' : 'group-hover:text-red-500'
                  }`}
                />
              </button>

              {/* Desktop Address Dropdown */}
              {openDropdown && (
                <div className='absolute left-0 top-full z-50 mt-2.5 w-80 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl shadow-red-500/10 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200'>
                  <div className='mb-3 flex items-center justify-between pb-2 border-b border-gray-100'>
                    <div className='flex items-center gap-2'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-md shadow-red-500/20'>
                        <MapPin className='h-4 w-4' />
                      </div>
                      <div>
                        <h3 className='text-sm font-bold text-gray-900'>Select Location</h3>
                        <p className='text-[11px] text-gray-500'>Enter address for exact delivery</p>
                      </div>
                    </div>
                    <button
                      onClick={closeDropdown}
                      className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>

                  <form onSubmit={handleManualAddress} className='space-y-2.5'>
                    <input
                      type='text'
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder='Street address, city, pincode...'
                      className='w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3.5 text-xs text-gray-800 placeholder-gray-400 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20'
                    />
                    <button
                      type='submit'
                      disabled={isLoading || !manualAddress.trim()}
                      className='w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/20 hover:from-red-600 hover:to-pink-700 transition-all disabled:opacity-50 cursor-pointer'
                    >
                      {isLoading ? <Loader size={4} label='Saving...' /> : 'Save Address'}
                    </button>
                  </form>

                  <div className='relative my-3 flex items-center justify-center'>
                    <div className='w-full border-t border-gray-100' />
                    <span className='absolute bg-white px-2 text-[10px] uppercase font-semibold text-gray-400'>OR</span>
                  </div>

                  <button
                    onClick={getShowLocation}
                    disabled={isLoading}
                    className='w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 py-2.5 text-xs font-semibold text-gray-700 hover:border-red-200 hover:bg-red-50/50 hover:text-red-600 transition-all disabled:opacity-50 cursor-pointer'
                  >
                    <Navigation className='h-3.5 w-3.5 text-red-500' />
                    {isLoading ? <Loader size={4} label='Detecting...' /> : 'Use Current Location'}
                  </button>
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className='flex items-center gap-6 font-semibold text-gray-700'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${isActive ? 'text-red-500 font-bold' : 'hover:text-red-500'} transition-colors`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Cart Icon */}
            <Link
              to='/cart'
              className='relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200'
            >
              <IoCartOutline className='h-6 w-6 text-gray-700' />
              <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white shadow-sm'>
                {totalCartCount}
              </span>
            </Link>

            {/* Auth Buttons */}
            {!isLoaded ? null : isSignedIn ? (
              <UserButton afterSignOutUrl='/' />
            ) : (
              <SignInButton mode='modal'>
                <button className='rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600 shadow-sm shadow-red-500/20 cursor-pointer'>
                  Login
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className='flex items-center gap-3 lg:hidden'>
            <Link
              to='/cart'
              className='relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200'
            >
              <ShoppingBag className='h-5 w-5 text-gray-700' />
              <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white shadow-sm'>
                {totalCartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      <div
        ref={backdropRef}
        onClick={closeMobileMenu}
        className='fixed inset-0 z-50 hidden bg-black/40 lg:hidden backdrop-blur-xs'
      />

      {/* Mobile Sidebar */}
      <aside
        ref={sidebarRef}
        className='fixed left-0 top-0 z-50 hidden h-full w-80 max-w-[85vw] overflow-y-auto border-r border-gray-200 bg-white p-5 shadow-2xl lg:hidden'
      >
        <div className='flex items-center justify-between pb-4 border-b border-gray-100'>
          <h2 className='text-2xl font-extrabold tracking-tight'>
            <span className='text-red-500'>V</span>olt <span className='text-red-500'>V</span>ibe
          </h2>
          <button
            type='button'
            onClick={closeMobileMenu}
            className='rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500 cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>

        <div className='mt-5 flex flex-col gap-4'>
          {/* Mobile Sidebar Address Card (Inline Collapsible) */}
          <div className='overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50/70 transition-all'>
            <div className='flex items-center justify-between p-3.5'>
              <div className='flex items-center gap-2.5 min-w-0'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500'>
                  <MapPin className='h-4.5 w-4.5' />
                </div>
                <div className='min-w-0'>
                  <p className='text-[10px] font-medium text-gray-400 uppercase tracking-wider'>Deliver to</p>
                  <p className='truncate text-xs font-bold text-gray-800'>{locationText}</p>
                </div>
              </div>
              <button
                type='button'
                onClick={toggleDropdown}
                className='shrink-0 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-red-500 shadow-xs hover:bg-red-50 transition-all cursor-pointer'
              >
                {openDropdown ? 'Close' : 'Change'}
              </button>
            </div>

            {/* Expanded Address Panel in Sidebar */}
            {openDropdown && (
              <div className='border-t border-gray-200/80 bg-white p-3.5 space-y-3 animate-in fade-in duration-200'>
                <form onSubmit={handleManualAddress} className='space-y-2'>
                  <label className='text-[11px] font-semibold text-gray-600'>Enter New Address</label>
                  <input
                    type='text'
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder='Street address, city, pincode...'
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20'
                  />
                  <button
                    type='submit'
                    disabled={isLoading || !manualAddress.trim()}
                    className='w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 py-2 text-xs font-bold text-white shadow-md shadow-red-500/20 hover:from-red-600 hover:to-pink-700 transition disabled:opacity-50 cursor-pointer'
                  >
                    {isLoading ? <Loader size={4} label='Saving...' /> : 'Save Address'}
                  </button>
                </form>

                <div className='relative my-2 flex items-center justify-center'>
                  <div className='w-full border-t border-gray-100' />
                  <span className='absolute bg-white px-2 text-[10px] uppercase font-semibold text-gray-400'>OR</span>
                </div>

                <button
                  onClick={getShowLocation}
                  disabled={isLoading}
                  className='w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-2 text-xs font-semibold text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50 cursor-pointer'
                >
                  <Navigation className='h-3.5 w-3.5 text-red-500' />
                  {isLoading ? <Loader size={4} label='Detecting...' /> : 'Use Current Location'}
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col gap-1.5'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-red-50 text-red-500 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  } rounded-xl px-3.5 py-3 font-semibold text-sm transition`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* User Account / Auth Section */}
          <div className='mt-2 rounded-2xl border border-gray-200/80 p-3.5 bg-gray-50/50'>
            {!isLoaded ? null : isSignedIn ? (
              <div className='flex items-center justify-between'>
                <span className='text-sm font-semibold text-gray-700'>My Account</span>
                <UserButton afterSignOutUrl='/' />
              </div>
            ) : (
              <SignInButton mode='modal'>
                <button className='w-full rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 shadow-md shadow-red-500/20 cursor-pointer'>
                  Login / Sign Up
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
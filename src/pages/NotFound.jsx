import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between font-sans">
      <main className="grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-6 inline-block">
            <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-amber-400 select-none">
              404
            </div>
            <div className="absolute -bottom-2 right-0 bg-red-500/10 border border-red-500/30 p-2 rounded-full text-red-500">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Page Not Found
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Oops! The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
            >
              <Home className="w-5 h-5" /> Go Back Home
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" /> Browse Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

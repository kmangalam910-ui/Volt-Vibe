import React from 'react';

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
    {/* Image placeholder */}
    <div className="w-full h-48 rounded-xl skeleton-shimmer" />
    {/* Title placeholder */}
    <div className="h-4 w-3/4 rounded-md skeleton-shimmer mt-1" />
    {/* Subtitle / Category */}
    <div className="h-3 w-1/2 rounded-md skeleton-shimmer" />
    {/* Price & Rating row */}
    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
      <div className="h-5 w-20 rounded-md skeleton-shimmer" />
      <div className="h-4 w-12 rounded-md skeleton-shimmer" />
    </div>
    {/* Button */}
    <div className="h-10 w-full rounded-xl skeleton-shimmer mt-1" />
  </div>
);

const PageSkeleton = ({ type = 'generic' }) => {
  if (type === 'products') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Search & Filter Bar Skeleton */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div className="h-10 w-64 rounded-xl skeleton-shimmer" />
          <div className="flex gap-2">
            <div className="h-10 w-24 rounded-xl skeleton-shimmer" />
            <div className="h-10 w-24 rounded-xl skeleton-shimmer" />
            <div className="h-10 w-32 rounded-xl skeleton-shimmer" />
          </div>
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'product-details') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-fade-in">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded-md skeleton-shimmer" />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-[400px] md:h-[480px] rounded-3xl skeleton-shimmer" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-20 rounded-xl skeleton-shimmer" />
              ))}
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded-md skeleton-shimmer" />
              <div className="h-8 w-4/5 rounded-lg skeleton-shimmer" />
              <div className="flex items-center gap-4">
                <div className="h-5 w-28 rounded-md skeleton-shimmer" />
                <div className="h-5 w-20 rounded-md skeleton-shimmer" />
              </div>
              <div className="h-8 w-36 rounded-xl skeleton-shimmer" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full rounded skeleton-shimmer" />
                <div className="h-3 w-5/6 rounded skeleton-shimmer" />
                <div className="h-3 w-4/6 rounded skeleton-shimmer" />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-12 w-32 rounded-xl skeleton-shimmer" />
                <div className="h-12 flex-1 rounded-xl skeleton-shimmer" />
              </div>
              <div className="h-12 w-full rounded-xl skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Technical Specs Tab Skeleton */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
          <div className="flex gap-4 border-b border-gray-100 pb-4">
            <div className="h-8 w-32 rounded-lg skeleton-shimmer" />
            <div className="h-8 w-32 rounded-lg skeleton-shimmer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-full rounded-xl skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cart' || type === 'checkout') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Title */}
        <div className="h-8 w-48 rounded-xl skeleton-shimmer" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main items / Form section */}
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 items-center">
                <div className="h-20 w-20 rounded-xl skeleton-shimmer flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                  <div className="h-3 w-1/3 rounded skeleton-shimmer" />
                  <div className="h-4 w-20 rounded skeleton-shimmer" />
                </div>
                <div className="h-8 w-24 rounded-lg skeleton-shimmer" />
              </div>
            ))}
          </div>

          {/* Sidebar Summary */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6 h-fit">
            <div className="h-6 w-36 rounded-lg skeleton-shimmer" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded skeleton-shimmer" />
                <div className="h-4 w-16 rounded skeleton-shimmer" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="h-4 w-16 rounded skeleton-shimmer" />
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <div className="h-5 w-24 rounded skeleton-shimmer" />
                <div className="h-5 w-20 rounded skeleton-shimmer" />
              </div>
            </div>
            <div className="h-12 w-full rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  // Default / Home / Generic Layout Skeleton
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      {/* Hero Banner Carousel Skeleton */}
      <div className="w-full h-72 md:h-96 rounded-3xl skeleton-shimmer relative overflow-hidden p-8 flex flex-col justify-end gap-4">
        <div className="h-6 w-32 rounded-full skeleton-shimmer bg-gray-300" />
        <div className="h-10 w-2/3 md:w-1/2 rounded-xl skeleton-shimmer bg-gray-300" />
        <div className="h-4 w-1/3 rounded-lg skeleton-shimmer bg-gray-300" />
      </div>

      {/* Categories Row Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-44 rounded-lg skeleton-shimmer" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full skeleton-shimmer" />
              <div className="h-3 w-16 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Grid Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-20 rounded skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

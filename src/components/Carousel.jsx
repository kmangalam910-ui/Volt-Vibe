import React from "react";
import useCarouselLogic from "../hooks/useCarouselLogic";

const Carousel = () => {
  const {
    currentIndex,
    slideItems,
    slideCount,
    prevSlide,
    nextSlide,
    goToSlide,
  } = useCarouselLogic();

  if (!slideCount) {
    return (
      <div className="w-full flex items-center justify-center min-h-75 bg-slate-900 rounded-lg">
        <div className="animate-pulse text-gray-400">Loading premium electronics...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Viewport container wrapping the inner slider track securely */}
      <div 
        className="relative w-full overflow-hidden shadow-2xl text-white select-none"
      >
        {/* Slider Track - Crucial fix: w-full added alongside explicit flex layout constraints */}
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideItems.map((item, index) => (
            <div
              key={item.id || index}
              className="w-full min-w-full shrink-0 bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden"
            >
              {/* Responsive container framework: stacks items nicely on mobile, expands horizontally on md screens */}
              <div className="flex flex-col-reverse gap-6 px-6 py-8 sm:px-12 md:flex-row md:items-center md:justify-between md:p-12 lg:p-16">
                
                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 md:space-y-6 text-center md:text-left">
                  <span className="text-red-500 font-bold text-[10px] sm:text-xs tracking-wider block">
                    POWERING YOUR WORLD WITH THE BEST PCs
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight uppercase leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed md:mx-0 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="pt-1 md:pt-2">
                    <button className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-red-500 to-pink-500 px-5 py-2.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:opacity-95 hover:scale-105 active:scale-95">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Image Showcase Container */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  <div className="relative w-full max-w-60 sm:max-w-sm md:max-w-md aspect-square flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/30 p-4 sm:p-6 shadow-inner backdrop-blur-sm border border-white/5">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Product image"}
                      draggable="false"
                      className="max-w-full max-h-40 sm:max-h-65 md:max-h-90 object-contain drop-shadow-[0_10px_20px_rgba(239,68,68,0.15)] transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Floating Side Control Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-900/40 border border-white/10 text-white text-xs sm:text-lg backdrop-blur-sm transition-all duration-200 hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-900/40 border border-white/10 text-white text-xs sm:text-lg backdrop-blur-sm transition-all duration-200 hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Slide Position Dots */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-slate-900/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {slideItems.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none ${
                currentIndex === slideIndex ? "w-4 sm:w-6 bg-red-500" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { DataContext } from "../store/contextStore";

const useCarouselLogic = () => {
  const { products, fetchProducts } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);

  const slideItems = products ? products.slice(0, 7) : [];
  const slideCount = slideItems.length;

  const nextSlide = useCallback(() => {
    if (!slideCount) return;
    setCurrentIndex((prevIndex) => (prevIndex === slideCount - 1 ? 0 : prevIndex + 1));
  }, [slideCount]);

  const prevSlide = () => {
    if (!slideCount) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slideCount - 1 : prevIndex - 1));
  };

  const goToSlide = (slideIndex) => {
    if (slideIndex < 0 || slideIndex >= slideCount) return;
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (fetchProducts) {
      fetchProducts();
    };
  }, [fetchProducts]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (slideCount > 1) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    };
  }, [slideCount, nextSlide, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  return { currentIndex, slideItems, slideCount, prevSlide, nextSlide, goToSlide};
};

export default useCarouselLogic;
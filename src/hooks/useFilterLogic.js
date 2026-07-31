import { useContext, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DataContext } from "../store/contextStore";

const useFilterLogic = () => {
  const { products, fetchProducts } = useContext(DataContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramCategory = searchParams.get('category') || 'ALL';

  const [search, setSearch] = useState('');
  const [category, setCategoryState] = useState(paramCategory);
  const [color, setColor] = useState('ALL');
  const [priceRange, setPriceRange] = useState([299, 74999]);

  // Sync state when URL searchParams change
  useEffect(() => {
    const currentCategory = searchParams.get('category');
    if (currentCategory) {
      setCategoryState(currentCategory);
    } else {
      setCategoryState('ALL');
    }
  }, [searchParams]);

  const setCategory = (newCat) => {
    setCategoryState(newCat);
    if (newCat && newCat.toUpperCase() !== 'ALL') {
      setSearchParams({ category: newCat });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    }
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(category === val ? 'ALL' : val);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleResetFilter = () => {
    setSearch('');
    setCategory('ALL');
    setColor('ALL');
    setPriceRange([299, 74999]);
  };

  const filteredData = useMemo(() => {
    if (!products) return [];
    return products.filter((item) => {
      const matchesSearch = !search.trim() || 
        item.title?.toLowerCase().includes(search.toLowerCase()) || 
        item.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category.toUpperCase() === 'ALL' || 
        item.category?.toUpperCase() === category.toUpperCase();

      const matchesColor = color.toUpperCase() === 'ALL' || 
        item.color?.toUpperCase() === color.toUpperCase();

      const itemPrice = Number(item.price);
      const matchesPrice = isNaN(itemPrice) || (itemPrice >= priceRange[0] && itemPrice <= priceRange[1]);

      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });
  }, [products, search, category, color, priceRange]);

  return {
    products,
    fetchProducts,
    search,
    setSearch,
    category,
    setCategory,
    color,
    setColor,
    priceRange,
    setPriceRange,
    handleCategoryChange,
    handleColorChange,
    handleResetFilter,
    filteredData
  };
};

export default useFilterLogic;
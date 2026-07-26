import { useContext, useState, useMemo } from "react";
import { DataContext } from "../store/contextStore";

const useFilterLogic = () => {
  const { products, fetchProducts } = useContext(DataContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [color, setColor] = useState('ALL');
  const [priceRange, setPriceRange] = useState([299, 74999]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory((prev) => (prev === val ? 'ALL' : val));
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
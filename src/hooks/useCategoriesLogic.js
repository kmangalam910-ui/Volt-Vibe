import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../store/contextStore";

const useCategoriesLogic = () => {
  const { products, fetchProducts } = useContext(DataContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'ALL';

  const getUniqueData = (data, property) => {
    let newVal = (products || [])
      .map((currentVal) => currentVal[property])
      .filter(Boolean);
    newVal = ["ALL", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueData(products, 'category');
  const colorOnlyData = getUniqueData(products, 'color');
  const priceOnlyData = getUniqueData(products, 'price');

  const handleCategoryClick = (catName) => {
    if (!catName || catName.toUpperCase() === 'ALL') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(catName)}`);
    }
  };

  return {
    fetchProducts,
    products,
    categoryOnlyData,
    colorOnlyData,
    priceOnlyData,
    activeCategory,
    handleCategoryClick
  };
};

export default useCategoriesLogic;

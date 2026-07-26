import { useContext } from "react";
import { DataContext } from "../store/contextStore";

const useCategoriesLogic = () => {
  const { products, fetchProducts } = useContext(DataContext);
  
    const getUniqueData = (data, property) => {
      let newVal = products.map((currentVal) => {
        return currentVal[property];
      });
      newVal = ["ALL", ...new Set(newVal)];
      return newVal;
    };
  
    const categoryOnlyData = getUniqueData(products, 'category');
    const colorOnlyData = getUniqueData(products, 'color');
    const priceOnlyData = getUniqueData(products, 'price');

    return {
      fetchProducts,
      products,
      categoryOnlyData,
      colorOnlyData,
      priceOnlyData
    };
};

export default useCategoriesLogic;

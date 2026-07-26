import axios from "axios";
import { createContext, useState, useCallback } from "react";

export const DataContext = createContext({
  products: [],
  fetchProducts: () => {}
});

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('https://kmangalam910-ui.github.io/my-electronics-json/data.json');
      const productsData = response.data.products;

      const updatedData = productsData.map((product) => {

          let category = 'none';

          if (product.id >= 1 && product.id <= 10){
            category = 'CPU';
          } else if (product.id >= 11 && product.id <= 20) {
            category = 'GPU'
          } else if (product.id >= 21 && product.id <= 30) {
            category = 'RAM';
          } else if (product.id >= 31 && product.id <= 40) {
            category = "Motherboard";
          } else if (product.id >= 41 && product.id <= 50) {
            category = 'SSD';
          } else if (product.id >= 51 && product.id <= 70) {
            category = 'PC';
          } else if (product.id >= 71 && product.id <= 90) {
            category = 'Cabinate';
          } else if (product.id >= 91 && product.id <= 110) {
            category = 'Mouse';
          } else if (product.id >= 111 && product.id <= 130) {
            category = 'Keyboard';
          } else if (product.id >= 131 && product.id <= 150) {
            category = 'Speakers';
          } else if (product.id >= 151 && product.id <= 170) {
            category = 'Printers';
          } else if (product.id >= 171 && product.id <= 190) {
            category = 'Laptop';
          } else if (product.id >= 191 && product.id <= 220) {
            category = 'Accessories';
          };

          return {
            ...product,
            category: category
          };
      });
      setProducts(updatedData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <DataContext.Provider value={{
      products,
      fetchProducts,
    }}>
      {children}
    </DataContext.Provider>
  );
};
import React, { useContext } from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import MidBanner from '../components/MidBanner';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {

  return (
    <>
      <Carousel />
      <Categories />
      <MidBanner />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
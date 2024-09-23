"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/Constants";

export const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get(`${BASE_URL}/api/ads/featured`);
      setAds(response.data.ads);
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/products/featured-vehicles`
      );
      console.log(response);
      setFeaturedProducts(response.data.vehicles);
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const fetchSpareParts = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/products/featured-spare-parts`
      );
      console.log(response);

      setSpareParts(response.data.spareParts);
    };

    fetchSpareParts();
  }, []);

  return (
    <AdsContext.Provider
      value={{
        ads,
        setAds,
        featuredProducts,
        setFeaturedProducts,
        spareParts,
        setSpareParts,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

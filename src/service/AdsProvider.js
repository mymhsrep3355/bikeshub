"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/Constants";


export const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get(`${BASE_URL}/api/ads/featured`);
      setAds(response.data.ads);
    };

    fetchAds();
  }, []);
  
  

  return (
    <AdsContext.Provider value={{ ads, setAds }}>
      {children}
    </AdsContext.Provider>
  );
};

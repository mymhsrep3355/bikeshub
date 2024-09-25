"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/Constants";
import { AuthContext } from "./AuthProvider";

export const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  console.log(token);

  const userId = user?.id;
  console.log("User ID:", userId);

  const [ads, setAds] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [userAds, setUserAds] = useState([]);
  const [allAds, setAllAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get(`${BASE_URL}/api/ads/featured`);
      setAds(response.data.ads);
    };

    fetchAds();
  }, []);


  useEffect(() => {
    const fetchAllAds = async () => {
      const response = await axios.get(`${BASE_URL}/api/ads`);
      console.log(response);
      
      setAllAds(response.data);
    };

    fetchAllAds();
  }, []);
  console.log(allAds);
  

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

  useEffect(() => {
    const fetchUserAds = async () => {
      if (!userId || !user.id || !token) {
        console.log("User or Token not found. Cannot fetch user ads.");
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/ads/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.ads);
        setUserAds(response.data.ads);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAds();
  }, [userId, token]);


  return (
    <AdsContext.Provider
      value={{
        ads,
        setAds,
        featuredProducts,
        setFeaturedProducts,
        spareParts,
        userAds,
        setUserAds,
        setSpareParts,
        allAds,
        setAllAds,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

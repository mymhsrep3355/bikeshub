"use client";

import { BASE_URL } from "@/Constants";
import React, { useEffect, useContext, useState, createContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext); 

  const [stores, setStores] = useState([]);
  const [storeById, setStoreById] = useState(null);
  const [userStores, setUserStores] = useState([]);
  const [storeParts, setStoreParts] = useState([]);

  const fetchSpareParts = async (storeId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/store/${storeId}/spare-parts`,
      )
      console.log(response.data);

      setStoreParts(response.data);
    
      
    } catch (error) {
      console.log(error)
    }
  }
  console.log(storeParts);
  

  useEffect(() => {
    const fetchStoresUser = async () => {
      if (!user) {
        console.error("No user available");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/stores/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserStores(response.data.stores);
      } catch (error) {
        console.error("Error fetching user stores:", error);
      }
    };

    fetchStoresUser();
  }, [user]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stores`);
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const fetchStoreDetails = async (storeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/stores/${storeId}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStoreById(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching store details:", error);
      return null;
    }
  };
  
  const addProductVehicle = async (data, id) => {
    try {
      const formData = new FormData();
      if (Array.isArray(data.images)) {
        data.images.forEach((file) => {
          formData.append("images", file);
        });
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("model",data.model);
      formData.append("price", data.price);
      formData.append("storeId", id);
      formData.append("location", data.location);
      formData.append("year", data.year);
      formData.append("company", data.company);

      const response = await axios.post(`${BASE_URL}/api/products/add-vehicle`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        return response.data;
      } else {
        return null;
      }
      
      
    } catch (error) {
      console.error("Error adding vehicle:", error);
      throw error;
    }
  }

  
  const addSpareParts = async (data, id) => {
    try {
      const formData = new FormData();
      if (Array.isArray(data.images)) {
        data.images.forEach((file) => {
          formData.append("images", file);
        });
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("storeId", id);
      formData.append("usage", data.usage);


      const response = await axios.post(`${BASE_URL}/api/products/add-spare-parts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        return response.data;
      } else {
        return null;
      }
      
      
    } catch (error) {
      console.error("Error adding vehicle:", error);
      throw error;
    }
  }

  return (
    <StoresContext.Provider
      value={{
        stores,
        setStores,
        storeById,
        userStores,
        setUserStores,
        setStoreById,
        fetchStoreDetails,
        addProductVehicle,
        addSpareParts,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
};

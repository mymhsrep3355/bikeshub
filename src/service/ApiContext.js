"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/Constants";
import { AuthContext } from "./AuthProvider";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const toast = useToast();

  const createStore = async (data) => {
    try {
      const formData = new FormData();
      if(Array.isArray(data.images)) {
        data.images.forEach((file) => {
          formData.append("images", file);
        })
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      const response = await axios.post(`${BASE_URL}/api/stores/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Store Created",
        description:
          "Your store has been created successfully. Check your stores to view it.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating store:", error);
      toast({
        title: "Error",
        description:
          "There was an error creating the store. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const postAd = async (data) => {
    try {
      const formData = new FormData();
      if (Array.isArray(data.images)) {
        data.images.forEach((file) => {
          formData.append("images", file);
        });
      }
      formData.append("adName", data.adName);
      formData.append("location", data.location);
      formData.append("salePrice", data.salePrice);
      formData.append("contact", data.contact);

      if (data.bikeInfo) {
        Object.entries(data.bikeInfo).forEach(([key, value]) => {
          formData.append(`bikeInfo[${key}]`, value);
        });
      }

      const response = await axios.post(
        `${BASE_URL}/api/ads/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Ad Posted",
        description:
          "Your ad has been posted successfully. It is now live on the platform.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error posting ad:", error);
      toast({
        title: "Error",
        description:
          "There was an error posting your ad. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const updateAd = async (adId, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/ads/${adId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Ad Updated",
        description: "Your ad has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating ad:", error);
      toast({
        title: "Error",
        description:
          "There was an error updating your ad. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const deleteAd = async (adId) => {
    try {
      await axios.delete(`${BASE_URL}/api/ads/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Ad Deleted",
        description: "Your ad has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast({
        title: "Error",
        description:
          "There was an error deleting your ad. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ createStore, postAd, updateAd, deleteAd }}>
      {children}
    </ApiContext.Provider>
  );
};

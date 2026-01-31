import { useState, useMemo } from "react";
import listingsData from "../constants/listings.json";
import { Subcategory, Product } from "../types/category";

export const useProducts = (searchQuery?: string) => {
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("all");

  // Extract subcategories from listings
  const subcategories = useMemo(() => {
    const subcategoryComponent = Object.values(
      listingsData.body.componentMap,
    ).find(
      (component: any) => component.name === "SubcategoryNavigationComponent",
    );
    return ((subcategoryComponent as any)?.componentData?.subcategories ||
      []) as Subcategory[];
  }, []);

  // Extract products from listings
  const allProducts = useMemo(() => {
    const productComponent = Object.values(listingsData.body.componentMap).find(
      (component: any) => component.name === "ProductListingComponent",
    );
    return ((productComponent as any)?.componentData?.productListings ||
      []) as Product[];
  }, []);

  // Filter products based on search query and selected subcategory
  const products = useMemo(() => {
    let filtered = allProducts;

    // STEP 1: Filter by search query (if provided)
    if (searchQuery && searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        // Search in product name
        const nameMatch = product.displayName.toLowerCase().includes(query);

        // Search in product description/callouts
        const descMatch =
          product.markerTextCallOut?.callOut?.toLowerCase().includes(query) ||
          false;

        // Search in category names
        const categoryMatch =
          product.category.name.toLowerCase().includes(query) ||
          product.subcategory.name.toLowerCase().includes(query);

        return nameMatch || descMatch || categoryMatch;
      });
    }

    // STEP 2: Filter by subcategory (if not "all" and no search query)
    if (
      selectedSubcategoryId !== "all" &&
      (!searchQuery || searchQuery.trim().length === 0)
    ) {
      filtered = filtered.filter(
        (product) => product.subcategory.id === selectedSubcategoryId,
      );
    }

    return filtered;
  }, [selectedSubcategoryId, allProducts, searchQuery]);

  return {
    subcategories,
    products,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
  };
};

import { View, FlatList, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "../types/category";
import ProductCard from "./ProductCard";
import { Ionicons } from "@expo/vector-icons";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onResetFilters?: () => void;
}

const ProductGrid = ({
  products,
  onAddToCart,
  onResetFilters,
}: ProductGridProps) => {
  const EmptyState = () => (
    <View className="flex-1 items-center justify-center pb-24">
      <View className="items-center">
        <View className="bg-gray-100 rounded-full w-24 h-24 items-center justify-center mb-6">
          <Ionicons name="basket-outline" size={48} color="#9CA3AF" />
        </View>
        <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
          No Products Found
        </Text>
        <Text className="text-base text-gray-500 text-center mb-8">
          Reset your filters to browse your favorite products
        </Text>
        {onResetFilters && (
          <TouchableOpacity
            onPress={onResetFilters}
            className="bg-green-800 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-base">
              Reset Filters
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View className="w-1/2 px-2">
          <ProductCard product={item} onAddToCart={onAddToCart} />
        </View>
      )}
      keyExtractor={(item) => item.listingId}
      numColumns={2}
      maxToRenderPerBatch={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: 16,
        paddingBottom: 96,
      }}
    />
  );
};

export default ProductGrid;

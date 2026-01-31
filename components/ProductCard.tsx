import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "../types/category";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <View className="bg-white p-2 rounded-2xl border-gray-200 overflow-hidden mb-4">
      {/* Badge */}

      {/* Product Image */}
      <View className="aspect-square">
        {product.markerTextCallOut?.callOut && (
          <View className="absolute bg-green-800 top-0 left-0 px-2 py-1 rounded-t-lg rounded-br-lg z-10">
            <Text className="text-xs text-white font-medium">
              {product.markerTextCallOut.callOut}
            </Text>
          </View>
        )}
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjNL2LnFt2Mh08y_R-Y8ahBfIahNTpbYMHA&s",
          }}
          className="w-full h-full rounded-lg overflow-hidden"
          resizeMode="cover"
        />
      </View>

      {/* Product Info */}
      <View className="p-3">
        <Text className="text-xs text-gray-500 mb-1">{product.quantity}</Text>
        <Text
          className="text-base font-semibold text-gray-900 mb-1"
          numberOfLines={2}
        >
          {product.displayName}
        </Text>
        {product.markerImageCallOut?.callOut && (
          <Text className="text-xs text-gray-400 mb-2">
            {product.markerImageCallOut.callOut}
          </Text>
        )}

        {/* Price and Add Button */}
        <View className="flex-row items-center justify-between mt-2">
          <View>
            <View className=" items-start w-full">
              <Text className="text-lg font-bold text-gray-900">
                ₹{product.price?.oneTimePrice?.memberPrice}
              </Text>
              {product.price.mrp && (
                <Text className="text-sm text-gray-400 line-through">
                  ₹{product.price.mrp}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-green-50 w-8 h-8 rounded-lg items-center justify-center"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="add" size={20} color="#15803d" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

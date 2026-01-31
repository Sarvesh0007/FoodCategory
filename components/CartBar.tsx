import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface CartBarProps {
  itemCount: number;
  savings: number;
  onViewCart: () => void;
}

const CartBar = ({ itemCount, savings, onViewCart }: CartBarProps) => {
  if (itemCount === 0) return null;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 mx-2 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-green-100 w-12 h-12 rounded-full items-center justify-center mr-3">
            <Ionicons name="cart" size={24} color="#15803d" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900">
              {itemCount} Item{itemCount > 1 ? "s" : ""} added
            </Text>
            <Text className="text-sm text-green-700">
              You saved ₹{savings} on this order
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onViewCart}
          className="bg-green-800 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartBar;

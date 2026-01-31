import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface CategoryHeaderProps {
  title: string;
  onTitlePress: () => void;
  onBackPress: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryHeader = ({
  title,
  onTitlePress,
  onBackPress,
  searchQuery,
  onSearchChange,
}: CategoryHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchPress = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    onSearchChange(""); // Clear search when closing
  };

  return (
    <View>
      {/* Main Header - Always Visible */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={onBackPress} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onTitlePress}
            className="flex-row items-center flex-1"
          >
            <Text className="text-xl font-semibold text-gray-900">{title}</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#000"
              className="ml-1"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSearchPress}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Input - Expands Below Header */}
      {showSearch && (
        <View className="px-4 pb-3">
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2.5">
            <Ionicons name="search" size={20} color="#666" className="mr-2" />
            <TextInput
              placeholder="Search for products..."
              placeholderTextColor="#999"
              className="flex-1 text-base font-medium text-gray-900"
              autoFocus
              value={searchQuery}
              onChangeText={onSearchChange}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => onSearchChange("")}
                className="ml-2"
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleCloseSearch} className="ml-2">
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CategoryHeader;

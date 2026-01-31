import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Subcategory } from "../types/category";

interface SubcategoryPillsProps {
  subcategories: Subcategory[];
  selectedSubcategoryId: string;
  onSelectSubcategory: (subcategoryId: string) => void;
}

const SubcategoryPills = ({
  subcategories,
  selectedSubcategoryId,
  onSelectSubcategory,
}: SubcategoryPillsProps) => {
  return (
    <View className="py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        <TouchableOpacity
          onPress={() => onSelectSubcategory("all")}
          className={`px-5 py-2 rounded-full mr-3 ${
            selectedSubcategoryId === "all"
              ? "bg-green-800"
              : "bg-white border border-gray-300"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              selectedSubcategoryId === "all" ? "text-white" : "text-gray-700"
            }`}
          >
            All
          </Text>
        </TouchableOpacity>

        {subcategories.map((subcategory) => {
          const isActive = subcategory.id === selectedSubcategoryId;
          return (
            <TouchableOpacity
              key={subcategory.id}
              onPress={() => onSelectSubcategory(subcategory.id)}
              className={`px-5 py-2 rounded-full mr-3 ${
                isActive ? "bg-green-800" : "bg-white border border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {subcategory.displayText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SubcategoryPills;

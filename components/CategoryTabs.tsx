import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import { Category } from "../types/category";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryTabs = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View | null }>({});

  const activeId = selectedCategoryId || categories[0]?.categoryId;

  // Scroll to active tab when it changes
  useEffect(() => {
    if (activeId && tabRefs.current[activeId] && scrollViewRef.current) {
      // Small delay to ensure layout is complete
      setTimeout(() => {
        tabRefs.current[activeId]?.measureLayout(
          scrollViewRef.current as any,
          (x, y, width, height) => {
            // Calculate scroll position to show the tab with padding on the left
            // This ensures previous tabs are visible when scrolling left
            const padding = 80; // Space from left edge
            const scrollToX = Math.max(0, x - padding);

            scrollViewRef.current?.scrollTo({
              x: scrollToX,
              y: 0,
              animated: true,
            });
          },
          () => {
            // Fallback: scroll by index if measurement fails
            const activeIndex = categories.findIndex(
              (cat) => cat.categoryId === activeId,
            );
            if (activeIndex !== -1) {
              // Show previous tab when scrolling left
              const scrollX = Math.max(0, (activeIndex - 0.5) * 120);
              scrollViewRef.current?.scrollTo({
                x: scrollX,
                y: 0,
                animated: true,
              });
            }
          },
        );
      }, 100);
    }
  }, [activeId, categories]);

  return (
    <View className="border-b border-gray-200">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {categories.map((category) => {
          const isActive = category.categoryId === activeId;
          return (
            <View
              key={category.categoryId}
              ref={(ref) => void (tabRefs.current[category.categoryId] = ref)}
              collapsable={false}
            >
              <TouchableOpacity
                onPress={() => onSelectCategory(category.categoryId)}
                className="mr-6 py-3"
              >
                <Text
                  className={`text-base font-medium ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {category.displayName}
                </Text>
                {isActive && (
                  <View className="h-0.5 bg-green-700 mt-2 rounded-full" />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryTabs;

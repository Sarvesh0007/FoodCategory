import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SuperCategory } from "../types/category";

interface BrowseCategoriesModalProps {
  visible: boolean;
  onClose: () => void;
  superCategories: SuperCategory[];
  selectedSuperCategoryId: string;
  onSelectSuperCategory: (categoryId: string) => void;
}

const BrowseCategoriesModal = ({
  visible,
  onClose,
  superCategories,
  selectedSuperCategoryId,
  onSelectSuperCategory,
}: BrowseCategoriesModalProps) => {
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Animate in when visible
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
      ]).start();
    } else {
      // Reset animations when closed
      slideAnim.setValue(0);
      backdropAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }

    return () => {
      slideAnim.setValue(0);
      backdropAnim.setValue(0);
      scaleAnim.setValue(0.95);
    };
  }, [visible, slideAnim, backdropAnim, scaleAnim]);

  const handleSelect = (categoryId: string) => {
    // Animate out before closing
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onSelectSuperCategory(categoryId);
      onClose();
    });
  };

  const handleClose = () => {
    // Animate out before closing
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // Calculate animated styles
  const backdropStyle = {
    opacity: backdropAnim,
  };

  const modalStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
      {
        scale: scaleAnim,
      },
    ],
    opacity: slideAnim,
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            backdropStyle,
            {
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                modalStyle,
                {
                  backgroundColor: "white",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  maxHeight: "80%",
                },
              ]}
            >
              {/* Drag indicator */}
              <View className="items-center pt-3 pb-2">
                <View className="w-12 h-1 bg-gray-300 rounded-full" />
              </View>

              <View className="px-6 pt-4 pb-4">
                <Text className="text-2xl font-bold text-center mb-6">
                  Browse Categories
                </Text>
              </View>

              <ScrollView className="px-6 pb-6">
                <View className="flex-row flex-wrap justify-between">
                  {superCategories?.map((category) => {
                    const isSelected =
                      category.categoryId === selectedSuperCategoryId;
                    return (
                      <TouchableOpacity
                        key={category.categoryId}
                        onPress={() => handleSelect(category.categoryId)}
                        className="w-[30%] items-center mb-6"
                        activeOpacity={0.7}
                      >
                        <View className="relative">
                          <View
                            className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-transparent"
                            style={isSelected ? { borderColor: "#15803d" } : {}}
                          >
                            <Image
                              source={{ uri: `${category.displayAssetUrl}` }}
                              className="w-full h-full"
                              resizeMode="cover"
                            />
                          </View>
                          {isSelected && (
                            <View className="absolute -top-1 -right-1 bg-green-700 rounded-full w-7 h-7 items-center justify-center border-2 border-white shadow-md">
                              <Ionicons
                                name="checkmark"
                                size={16}
                                color="white"
                              />
                            </View>
                          )}
                        </View>
                        <Text className="text-sm text-center mt-2 text-gray-900 font-medium">
                          {category.categoryName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BrowseCategoriesModal;

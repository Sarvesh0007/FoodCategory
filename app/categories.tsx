import { Alert, View } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import CategoryHeader from "../components/CategoryHeader";
import BrowseCategoriesModal from "../components/BrowseCategoriesModal";
import CategoryTabs from "../components/CategoryTabs";
import SubcategoryPills from "../components/SubcategoryPills";
import ProductGrid from "../components/ProductGrid";
import CartBar from "../components/CartBar";

import { useProducts } from "../hooks/useProducts";
import useDebounceSearch from "../hooks/use-debounce-search";
import { useCategoryStore } from "../store/useCategoryStore";
import { useCartStore } from "../store/useCartStore";

const CategoriesPage = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounceSearch(searchQuery, 300);

  // Zustand stores
  const {
    superCategories,
    categories,
    selectedSuperCategory,
    selectedSuperCategoryId,
    selectedCategoryId,
    initialize,
    setSelectedSuperCategoryId,
    setSelectedCategoryId,
  } = useCategoryStore();

  // Subscribe to cart store - these will trigger re-renders on cart changes
  const addToCart = useCartStore((state) => state.addToCart);
  const itemCount = useCartStore((state) => state.getItemCount());
  const savings = useCartStore((state) => state.getSavings());
  const clearCart = useCartStore((state) => state.clearCart);

  // Initialize store on mount (only runs once)
  useEffect(() => {
    initialize();
  }, [initialize]);

  const {
    subcategories,
    products,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
  } = useProducts(debouncedSearch);

  // Handlers
  const handleBackPress = () => {
    router.back();
  };

  const handleTitlePress = () => {
    setModalVisible(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectSuperCategory = (categoryId: string) => {
    setSelectedSuperCategoryId(categoryId);
    setSelectedCategoryId("");
    setSelectedSubcategoryId("all");
    setSearchQuery("");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId("all");
    setSearchQuery("");
  };

  const handleViewCart = () => {
    clearCart();
    Alert.alert("Cart cleared", "All items have been removed from your cart");
  };

  const handleResetFilters = () => {
    setSelectedSubcategoryId("all");
    setSearchQuery("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCF7EE]" edges={["top"]}>
      {/* Header */}
      <CategoryHeader
        title={selectedSuperCategory?.categoryName || "Categories"}
        onTitlePress={handleTitlePress}
        onBackPress={handleBackPress}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {/* Category Tabs */}
      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          selectedCategoryId={selectedCategoryId || ""}
          onSelectCategory={handleSelectCategory}
        />
      )}
      {/* Subcategory Pills */}
      {subcategories.length > 0 && (
        <SubcategoryPills
          subcategories={subcategories}
          selectedSubcategoryId={selectedSubcategoryId}
          onSelectSubcategory={setSelectedSubcategoryId}
        />
      )}
      {/* Product Grid */}
      <View className="flex-1">
        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          onResetFilters={handleResetFilters}
        />
      </View>
      {/* Cart Bar */}
      <CartBar
        itemCount={itemCount}
        savings={savings}
        onViewCart={handleViewCart}
      />
      {/* Browse Categories Modal */}
      <BrowseCategoriesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        superCategories={superCategories}
        selectedSuperCategoryId={
          selectedSuperCategoryId || selectedSuperCategory?.categoryId || ""
        }
        onSelectSuperCategory={handleSelectSuperCategory}
      />
    </SafeAreaView>
  );
};

export default CategoriesPage;

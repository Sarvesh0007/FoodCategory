import { create } from "zustand";
import { SuperCategory, Category } from "../types/category";

// Mapping of super category names to their component names
const SUPER_CATEGORY_COMPONENT_MAP: Record<string, string> = {
  Featured: "WB-Category Tab - FeaturedComponent",
  "Fruits & Vegetables": "WB-Category Tab - Fresh Fruits & VegetablesComponent",
  "Breads, Dairy & Eggs": "WB-Category Tab - Breads, Dairy & EggsComponent",
  Staples: "WB-Category Tab - GroceriesComponent",
  "Kids Food & Nutrition": "WB-Category Tab - Kids Food and NutritionComponent",
  "Packaged Foods": "WB-Category Tab - Packaged FoodsComponent",
  "Snacks & More": "WB-Category Tab - Snacks and MoreComponent",
  "Health Supplements": "WB-Category Tab - Health & SupplementsComponent",
  "Cleaning Essentials": "WB-Category Tab - Tissues & DisposablesComponent",
};

interface CategoryState {
  // Static data (loaded once)
  superCategories: SuperCategory[];
  categories: Category[];

  // Selection state
  selectedSuperCategoryId: string | null;
  selectedCategoryId: string | null;

  // Computed/derived state
  selectedSuperCategory: SuperCategory | null;

  // Actions
  initialize: () => void;
  setSelectedSuperCategoryId: (id: string) => void;
  setSelectedCategoryId: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  // Initial state
  superCategories: [],
  categories: [],
  selectedSuperCategoryId: null,
  selectedCategoryId: null,
  selectedSuperCategory: null,

  initialize: () => {
    const state = get();

    if (state.superCategories.length > 0) return;

    const superCategoryData = require("../constants/super-category.json");

    if (!superCategoryData?.body?.pageResponseDto?.componentMap) {
      console.error(
        "Super category data not loaded properly",
        superCategoryData,
      );
      return;
    }

    const superCategoriesComponent = Object.values(
      superCategoryData.body.pageResponseDto.componentMap,
    ).find(
      (component: any) =>
        component.name === "WB-Category Tab Left Panel V3Component",
    );

    if (!superCategoriesComponent) {
      console.error("Super categories component not found");
      return;
    }

    const superCategories: SuperCategory[] = (
      (superCategoriesComponent as any).componentData || []
    ).sort((a: any, b: any) => a.rank - b.rank);

    if (superCategories.length === 0) {
      console.error("No super categories found");
      return;
    }

    // Set first super category as default
    const firstSuperCategory = superCategories[0];
    const componentName =
      SUPER_CATEGORY_COMPONENT_MAP[firstSuperCategory.categoryName];

    // Extract categories for the first super category
    const categoryComponent = Object.values(
      superCategoryData.body.pageResponseDto.componentMap,
    ).find((comp: any) => comp.name === componentName);

    const categories: Category[] =
      (categoryComponent as any)?.componentData || [];

    set({
      superCategories,
      categories,
      selectedSuperCategoryId: firstSuperCategory.categoryId,
      selectedSuperCategory: firstSuperCategory,
      selectedCategoryId: null,
    });
  },

  // Update selected super category and load its categories
  setSelectedSuperCategoryId: (id: string) => {
    const state = get();
    const targetSuperCategory = state.superCategories.find(
      (sc) => sc.categoryId === id,
    );

    if (!targetSuperCategory) return;
    const componentName =
      SUPER_CATEGORY_COMPONENT_MAP[targetSuperCategory.categoryName];

    // Load JSON data
    const superCategoryData = require("../constants/super-category.json");

    if (!superCategoryData?.body?.pageResponseDto?.componentMap) {
      console.error("Super category data not available");
      return;
    }

    const categoryComponent = Object.values(
      superCategoryData.body.pageResponseDto.componentMap,
    ).find((comp: any) => comp.name === componentName);

    const categories: Category[] =
      (categoryComponent as any)?.componentData || [];

    set({
      selectedSuperCategoryId: id,
      selectedSuperCategory: targetSuperCategory,
      categories,
      selectedCategoryId: null, // Reset category selection
    });
  },

  // Update selected category
  setSelectedCategoryId: (id: string) => {
    set({ selectedCategoryId: id });
  },
}));

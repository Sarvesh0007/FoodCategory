import { create } from "zustand";
import { Product } from "../types/category";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed values
  getItemCount: () => number;
  getSavings: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product: Product) => {
    const state = get();
    const existingItem = state.items.find(
      (item) => item.product.listingId === product.listingId,
    );

    if (existingItem) {
      set({
        items: state.items.map((item) =>
          item.product.listingId === product.listingId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ items: [...state.items, { product, quantity: 1 }] });
    }
  },

  removeFromCart: (listingId: string) => {
    const state = get();
    set({
      items: state.items.filter((item) => item.product.listingId !== listingId),
    });
  },

  updateQuantity: (listingId: string, quantity: number) => {
    const state = get();
    if (quantity <= 0) {
      get().removeFromCart(listingId);
      return;
    }

    set({
      items: state.items.map((item) =>
        item.product.listingId === listingId ? { ...item, quantity } : item,
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSavings: () => {
    const state = get();
    return state.items.reduce((sum, item) => {
      const itemSavings =
        (item.product.price.mrp - item.product.price.oneTimePrice.memberPrice) *
        item.quantity;
      return sum + itemSavings;
    }, 0);
  },

  getTotalAmount: () => {
    const state = get();
    return state.items.reduce((sum, item) => {
      const itemTotal =
        item.product.price.oneTimePrice.memberPrice * item.quantity;
      return sum + itemTotal;
    }, 0);
  },
}));

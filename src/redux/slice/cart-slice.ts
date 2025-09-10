import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  description: string;
  image: any;
  category: string;
  quantity: number;
  selectedFlavor: string;
  selectedSize: string;
  selectedExtras: string[];
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id &&
          item.selectedFlavor === action.payload.selectedFlavor &&
          item.selectedSize === action.payload.selectedSize &&
          JSON.stringify(item.selectedExtras.sort()) ===
            JSON.stringify(action.payload.selectedExtras.sort()),
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = calculateItemTotal(existingItem);
      } else {
        state.items.push(action.payload);
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        } else {
          item.quantity = action.payload.quantity;
          item.totalPrice = calculateItemTotal(item);
        }
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    clearCart: state => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

// Helper function to calculate item total
const calculateItemTotal = (item: CartItem): number => {
  let total = item.price * item.quantity;

  // Add size pricing
  if (item.selectedSize === 'Large') total += 200 * item.quantity;
  else if (item.selectedSize === 'Medium') total += 100 * item.quantity;

  // Add extras pricing
  total += item.selectedExtras.length * 50 * item.quantity;

  return total;
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

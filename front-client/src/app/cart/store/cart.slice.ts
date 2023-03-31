import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== interfaces & dto's ===========================
import { ICartState } from "../types/cart-state.interface";
import { CartDto } from "../types/cart.dto";

// =========================== actions ===========================
import {
  addCartItem,
  clearCart,
  deleteCartItem,
  fetchCart,
  updateCartItem,
} from "./cart.actions";

const initialState: ICartState = {
  cart: null,
  pending: {
    cart: false,
  },
  errors: {
    cart: null,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.cart = null;
    },
  },
  extraReducers: (builder) => {
    // ================== get cart ==================
    builder
      .addCase(fetchCart.pending, (state) => {
        state.pending.cart = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartDto>) => {
        state.pending.cart = false;
        state.errors.cart = null;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      });

    // ================== add new item to cart ==================
    builder
      .addCase(addCartItem.pending, (state) => {
        state.pending.cart = true;
      })
      .addCase(
        addCartItem.fulfilled,
        (state, action: PayloadAction<CartDto>) => {
          state.pending.cart = false;
          state.errors.cart = null;
          state.cart = action.payload;
        }
      )
      .addCase(
        addCartItem.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.cart = false;
          state.errors.cart = action.payload;
        }
      );

    // ================== update item in cart ==================
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.pending.cart = true;
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<CartDto>) => {
          state.pending.cart = false;
          state.errors.cart = null;
          state.cart = action.payload;
        }
      )
      .addCase(
        updateCartItem.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.cart = false;
          state.errors.cart = action.payload;
        }
      );

    // ================== clear cart ==================
    builder
      .addCase(clearCart.pending, (state) => {
        state.pending.cart = true;
      })
      .addCase(clearCart.fulfilled, (state, action: PayloadAction<CartDto>) => {
        state.pending.cart = false;
        state.errors.cart = null;
        state.cart = action.payload;
      })
      .addCase(clearCart.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      });

    // ================== delete cart item ==================
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.pending.cart = true;
      })
      .addCase(
        deleteCartItem.fulfilled,
        (state, action: PayloadAction<CartDto>) => {
          state.pending.cart = false;
          state.errors.cart = null;
          state.cart = action.payload;
        }
      )
      .addCase(
        deleteCartItem.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.cart = false;
          state.errors.cart = action.payload;
        }
      );
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { clearErrors } = actions;

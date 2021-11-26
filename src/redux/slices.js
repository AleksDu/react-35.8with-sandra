import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, currentThunk, logoutThunk } from "./thunks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: "", email: "" },
    token: "",
    error: null,
    isLoading: false,
    isAuth: false,
    myProp: "Hello",
  },
  reducers: {
    renameProp: (state, action) => {
      return {
        ...state,
        myProp: action.payload,
      };
    },
  },
  extraReducers: {
    [registerThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    [registerThunk.fulfilled](state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
      };
    },
    [registerThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [loginThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    [loginThunk.fulfilled](state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
      };
    },
    [loginThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [currentThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    [currentThunk.fulfilled](state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuth: true,
      };
    },
    [currentThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuth: false,
      };
    },
    [logoutThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    [logoutThunk.fulfilled](state, action) {
      return {
        ...state,
        isLoading: false,
        user: { name: "", email: "" },
        token: "",
        isAuth: false,
      };
    },
    [logoutThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { renameProp } = authSlice.actions;
export default authSlice.reducer;

// =========== PRODUCTS ==============
const BASE_PRODUCT_URL = `https://619d2ffb131c600017088dd7.mockapi.io/api/v1/`;
const products = `/products`;
export const productAPpiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_PRODUCT_URL }),
  tagTypes: [`Prods`],
  endpoints: (builder) => {
    return {
      fetchProducts: builder.query({
        query: () => products,
        providesTags: (result, err, arg) => {
          return [
            ...result.map(({ id }) => {
              console.log(id);
              return {
                type: "Prods",
                id,
              };
            }),
          ];
        },
      }),
      addProduct: builder.mutation({
        query: (prod) => {
          return {
            method: "POST",
            url: products,
            body: prod,
          };
        },
        invalidatesTags: [`Prods`],
      }),
      removeProduct: builder.mutation({
        query: (id) => {
          return {
            method: "DELETE",
            url: `${products}/${id}`,
          };
        },
        invalidatesTags: (res, err, id) => [{ type: "Prods", id }],
      }),
    };
  },
});
export const {
  useFetchProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = productAPpiSlice;

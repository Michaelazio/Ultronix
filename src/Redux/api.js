import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export const ecommerceAPI = createApi({
  reducerPath: "ecommerceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      const token = getState().auth.token;

      if (token) {
        console.log("Token added to request headers:", token);
        headers.set("Authorization", `Bearer ${token}`);
      }

    



      return headers;
    },
  }),
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (signupCredentials) => {
        return {
          url: "/api/v1/signup",
          method: "POST",
          body: signupCredentials,
        };
      },
    }),
    userUpdatesProfile: builder.mutation({
      query: (userCredentials) => ({
        url: "/api/v1/update",
        method: "PATCH",
        body: userCredentials,
      }),
    }),
    getBrands: builder.query({
      query: () => "/api/v1/products",
      providesTags:["Brands"],
      invalidatesTags: ["Brands"]
    }),
    getProductsBasedOnBrand: builder.query({
      query: (brand) => `/api/v1/products/${brand}`,
     providesTags: ["Product-Card"]
    }),
    getTheModelOfABrand: builder.query({
      query: ( model) => `/api/v1/products/brand/${model}`,
     invalidatesTags: ["Brands", "Product-Card"]
    }),
    setWishlist : builder.mutation({
      query: (details) => ({
        url: '/api/v1/wishlist/store',
        method: 'POST',
        body: details
      })
    }),
    deletionWishlist: builder.mutation({
      query : (model) =>({
        url: '/api/v1/wishlist/delete',
        method: 'DELETE',
        body: model
      })
    }),
    createReview: builder.mutation({
      query: (docs, model) => ({
        url: `/api/v1/review/${model}`,
        method: 'POST',
        body: docs
      }),
      providesTags: ['Reviews']
    }),
    getReviewsOfAProduct: builder.query({
      query: (model) => `/api/v1/review/${model}`,
      
    }),
    updateReview : builder.mutation({
      query: (docs, model) => ({
        url:`/api/v1/review/${model}`,
        method: 'PATCH',
        body: docs
      }),
      providesTags:['Update_Review']
    }),
    deletionReview: builder.mutation({
      query: (model) =>({
        url: `/api/v1/review/${model}`,
        method: 'DELETE',
        
      })
    })
  }),
});

export const {
  useUserUpdatesProfileMutation,
  useUserSignupMutation,
  useGetBrandsQuery,
  useGetProductsBasedOnBrandQuery,
  useGetTheModelOfABrandQuery,
  useSetWishlistMutation,
  useDeletionWishlistMutation,
  useCreateReviewMutation,
  useDeletionReviewMutation,
  useGetReviewsOfAProductQuery,
  useUpdateReviewMutation
} = ecommerceAPI;

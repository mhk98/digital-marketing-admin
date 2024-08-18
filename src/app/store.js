// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/products/products";
import { taskApi } from "../features/tasks/tasks";
import { UserApi } from "../features/user/user";


const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,

  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      taskApi.middleware,
      UserApi.middleware,
      
      
      
    ),
});

export default store;

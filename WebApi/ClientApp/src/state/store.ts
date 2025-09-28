import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas/rootSaga";
import reducers from "./reducers/rootReducer";

// Khởi tạo middleware saga
const sagaMiddleware = createSagaMiddleware();

// Cấu hình store với configureStore của Redux Toolkit
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware): any =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production", // Bật redux-devtools trong môi trường phát triển
});

// Khởi chạy saga
sagaMiddleware.run(rootSaga);

// Định nghĩa AppDispatch type để sử dụng trong dự án
export type AppDispatch = typeof store.dispatch;

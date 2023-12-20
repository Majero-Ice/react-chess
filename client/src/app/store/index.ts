import { configureStore,} from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import socketMiddleware from "./middlewares/socketMiddleware";


export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat([socketMiddleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
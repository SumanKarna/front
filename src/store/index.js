import { configureStore } from "@reduxjs/toolkit"
import userReducer, { setUser, clearUser } from "./userSlice"
import cartReducer, { setCart, clearCart } from "./cartSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }

})

export default store
export {setUser, clearUser, setCart, clearCart}
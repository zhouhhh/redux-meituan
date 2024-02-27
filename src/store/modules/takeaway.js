import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],//商品列表
        activeIndex: 0,//左侧菜单激活下标
        cartList: [],//购物车列表
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                action.payload.count = 1
                state.cartList.push(action.payload)
            }
        },
        // count增
        increCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // count减
        decreCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item.count === 0) {
                return
            }
            item.count--
        },
        //清除购物车
        clearCart(state) {
            state.cartList = []
        }
    }
})

//异步获取数据
const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodsList(res.data))
    }
}
export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart }

const reducer = foodsStore.reducer

export default reducer
import { configureStore, createSlice } from "@reduxjs/toolkit";

import user from './store/userSlice'





let stock = createSlice({
    name : 'stock',
    initialState  : [10, 11, 12]
})

let cart_data = createSlice({
    name : 'cart_data',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, actions){
            state.map((a,i)=>{
                if (a.id == actions.payload){
                    a.count+=1
                }
            })
        },
        addCart(state, actions){
           console.log(actions.payload) 
           state.push(actions.payload)
           console.log(state.length)
        }
    }
})

export let { changeCount, addCart } = cart_data.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart_data : cart_data.reducer
    }
})
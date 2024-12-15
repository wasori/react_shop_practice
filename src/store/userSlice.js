import { configureStore, createSlice } from "@reduxjs/toolkit";

// state와 비슷한느낌
let user = createSlice({
    // state 이름
    name : 'user',
    // 값
    initialState : { name : 'kim', age : 20 },
    reducers : {
        changeName(state){
            state.name = 'park'
        },
        changeAge(state){
            state.age ++
        }
    }
})

export let { changeName, changeAge } = user.actions

export default user
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, changeName } from "./../store/userSlice.js"
import { changeCount } from "../store.js";

function Cart() {

    let state = useSelector((state)=>{ return state})
    let dispatch = useDispatch()

    return (
        <div>

            { state.user.name } { state.user.age }의 장바구니
            <button onClick={()=>{
                dispatch(changeAge())
            }}>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        state.cart_data.map((a, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{state.cart_data[i].id}</td>
                                    <td>{state.cart_data[i].name}</td>
                                    <td>{state.cart_data[i].count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(changeCount(state.cart_data[i].id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;
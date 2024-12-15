import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components';
import { useDispatch } from "react-redux";

import { addCart } from "../store";

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding : 10px
// `

// let DarkBox = styled.div`
//   background : grey;
//   padding : 20px;
// `

function Detail(props) {

  let {product_id} = useParams();
  let [newalert, setAlert] = useState(true);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');

  let dispatch = useDispatch();

  var result = props.shoes.find((x) => x.id == product_id )

  useEffect(()=>{
    // mount, update시 실행
    let a = setTimeout(()=>{setAlert(false)},2000)
    let b = setTimeout(()=>{setFade('end')},100)

    // clean up fuction => mount시 실행안됨, 재랜더링시, unmount시에 실행됨
    // ex) 기존타이머는 제거해주세요
    // 서버로 데이터 요청 코드 (2초) ==> 2초되기전에 랜더링된다면? => 버그 많아질 가능성높음
    // ex) 기존 데이터요청은 제거해주쇼
    return()=>{
      clearTimeout(a)
      clearTimeout(b)
      setFade('')
    }
  }, [])

  // useEffect(()=>{
  //   if ( isNaN(num) == true ){
  //     alert('숫자만 입력하세요');
  //   } 
  // },[num])

  // [] 디펜던시 추가하면 mount때만 실행

  

  return (
    
    <div className={"container start " + fade}>
      {/* <YellowBtn bg = "blue">버튼</YellowBtn>
      <YellowBtn bg = "orange">버튼</YellowBtn> */}
      {
        newalert == true ?
        <div className="alert alert-warning">
          2초 이내 구매시 할인
        </div> 
        : null
      }
      
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(product_id) + 1) +".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          {/* <input onChange={(e)=>{setNum(e.target.value)}}></input> */}
          <h4 className="pt-5">{props.shoes[result.id].content}</h4>
          <p>{props.shoes[result.id].content}</p>
          <p>{props.shoes[result.id].price}원</p>
          <button className="btn btn-danger" 
          onClick={()=>{
            dispatch(addCart(props.shoes[result.id]))
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab = {tab} />

    </div>
  )
}

function TabContent({tab}){

  let [fade, setFade] = useState('')

  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')},100)
    
    return()=>{
      clearTimeout(a)
      setFade('')
    }
  }, [tab])

  if(tab == 0){
    return <div className={"start " + fade}>내용0</div>
  }
  if(tab == 1){
    return <div className={"start " + fade}>내용1</div>
  }
  if(tab == 2){
    return <div className={"start " + fade}>내용2</div>
  }
}

export default Detail;
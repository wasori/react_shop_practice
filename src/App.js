import { useState } from 'react';
import { Route, Routes, Link , useNavigate, Outlet } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import './App.css';
import bg from './img/bg.png';
import data from './data'
import Detail from './routes/Detail'
import Cart from './routes/Cart'
import axios from 'axios';

function App() {

  let [shoes,setShoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className='nav-container'>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event')}}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes}/>} />
        <Route path="/detail" element={ <Detail shoes={shoes} /> } />
        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>멤버임</div> }/>
          <Route path="location" element={ <div>위치정보임</div> }/>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

        
        <Route path="/detail/:product_id" element={ <Detail shoes={shoes}/> } />

        <Route path="/cart" element={<Cart/>}></Route>

        <Route path="*" element={ <div>없는페이지~</div> } />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} width="80%" />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}</p>
    </div>
  )
}

function Main(props) {
  return (
    <>
      <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }}></div>
      <div className="container">
        <div className="row">
          {
            props.shoes.map(function (a, i) {
              return (
                <Card shoes={props.shoes} i={i} />
              )
            })
          }
        </div>
        <button onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{
            console.log(result.data)
            let copy = [...props.shoes, ...result.data];
            props.setShoes(copy)
          })
          .catch(()=>{
            console.log('실패함;')
          })
        }}>버튼</button>
      </div>
    </>
  )
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;

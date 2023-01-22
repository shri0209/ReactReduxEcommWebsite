import React,{useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import {Table} from 'react-bootstrap'
// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import CartImg from './cart.gif'
import { DLT } from '../redux/actions/action';
import {useDispatch, useSelector} from 'react-redux'


const Header = () => {

    const [price,setPrice] = useState(0);
    
    console.log(price);

    const getData = useSelector((state)=> state.cartreducer.carts);
    // console.log(getData)

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
      dispatch(DLT(id))
    }

    const total = () =>{
      let price = 0;
      getData.map((ele,k)=>{
        return(
        price = ele.price * ele.qnty + price
        )
      })
      setPrice(price);
    };

    useEffect(()=>{
      total();
    },[total])

    

    return(
        <>
        <Navbar bg="dark" className='fixed-top' variant="dark" style={{height:"60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-white mx-4">E-Commerce</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-white">HOME</NavLink>
          </Nav>
          

          <Badge badgeContent={getData.length} color="primary" 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
          <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:25,cursor:"pointer"}}></i>
          </Badge>
          
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
          {
            getData.length?
            <div className='card_details' style={{width:"24rem",padding:10}}>
                <Table>
                  <thead>
                    <tr>
                      <th>Photos</th>
                      <th>Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData.map((e)=>{
                        return(
                        <>
                          <tr>
                              <td>
                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                  <img src={e.imgdata} style={{width:"7rem", height:"7rem"}} alt="cartImg"/></NavLink>
                              </td>
                              <td>
                                <p>{e.rname}</p>
                                <p>Price : {e.price} ₹</p>
                                <p>Quantity : {e.qnty}</p>
                                <p style={{color:"red",fontSize:"20",cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                  <i className='fas fa-trash smalltrash'></i>
                                </p>
                              </td>
                              <td className='mt-5' style={{color:"red",fontSize:"20",cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                <i className='fas fa-trash largetrash'></i>
                              </td>
                          </tr>
                        </>
                        )
                      })
                    }
                    <p className='text-center'>Total :{price}₹</p>
                  </tbody>
                </Table>
            </div> :
            <div className='card_details d-flex justify-content-center align-items-center' style={{width:"24rem",padding:10,position:"relative"}}>
            <i className='fas fa-close smallclose' 
            onClick={handleClose} style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
            <p style={{fontSize:"22"}}>Your Cart Is Empty</p>
            <img src={CartImg} alt="cart" className='emptycart_img' style={{width:"6rem",padding:10}} /> 
        </div>
          }
        
      </Menu>
      </Navbar>
      </>
    )
}

export default Header
import { Add, Remove } from '@material-ui/icons'
import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {mobile} from "./../responsive"
import {useSelector} from "react-redux"
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod'
import { useNavigate } from 'react-router-dom'
const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container=styled.div`
   
`

const Wrapper=styled.div`
    padding:20px;
    margin-bottom:${props=>props.marginBottom};
    ${mobile({
        padding:"10px"
    })}
`

const Title=styled.h1`
    font-weight:300;
    text-align:center;
    margin-top:${props=>props.marginTop};
`

const Top=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${props=>props.type==="filled" && "none"};
    background-color:${props=>props.type==="filled" ? "black" : "transparent"};
    color:${props=>props.type==="filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({
        display:"none"
    })}
`

const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`

const Bottom=styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({
        flexDirection:"column"
    })}
`

const Info=styled.div`
    flex:3;

`

const Product=styled.div`
   display:flex;
   justify-content:space-between;
   ${mobile({
    flexDirection:"column"
})}
`

const ProductDetail=styled.div`
   flex:2;
   display:flex;
`

const Image=styled.img`
   width:200px
`

const Details=styled.div`
   padding:20px;
   display:flex;
   flex-direction:column;
   justify-content:space-around;
`

const ProductName=styled.span``

const ProductId=styled.span``

const ProductColor=styled.div`
   width:20px;
   height:20px;
   background-color:${props=>props.color};
   border-radius:50%;
`

const ProductSize=styled.span``

const PriceDetail=styled.span`
   flex:1;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:column;
`

const ProductAmountContainer=styled.div`
   display:flex;
   align-items:center;
   margin-bottom:20px;
`

const ProductAmount=styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({
        margin:"5px 15px"
    })}
`

const ProductPrice=styled.div`
   font-size:30px;
   font-weight:200;
   ${mobile({
    marginBottom:"25px"
})}
`

const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`

const Sunmary=styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;

`

const SunmaryTitle=styled.h1`
    font-weight:200;
`

const SunmaryItem=styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${props=>props.type==="total"&&"500"};
    font-size:${props=>props.type==="total"&&"24px"};
`

const SunmaryItemText=styled.span`

`

const SunmaryItemPrice=styled.span`

`

const SunmaryButton=styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`

const Cart = () => {
  const cart = useSelector(state=>state.cart)
  const [stripeToken,setStripeToken] = useState(null)
  const navigate = useNavigate
  const onToken =(token)=>{
    setStripeToken(token)
  }

  useEffect(()=>{
    const makeRequest = async()=>{
        try{
            const response = await userRequest.post("/checkout/payment",{
                tokenId:stripeToken.id,
                amount:cart.total *100,
            });
            navigate('/success',{data:response.data})
        }catch(e){}
    }
    stripeToken && cart.total >=1 && makeRequest()
  },[stripeToken,cart.total,navigate])

  if(cart.products.length === 0){
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper marginBottom="300px">
                <Title marginTop="250px">DATA KOSONG</Title>
            </Wrapper>
            <Footer />
        </Container>
    )
  }

  return (
    <Container>
        <Navbar />
        <Announcement/>
        <Wrapper>
            <Title>YOUR BAG </Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map((data)=>(
                        <Product key={data._id}>
                            <ProductDetail>
                                <Image src={data.img}/>
                                <Details>
                                    <ProductName><b>Product:</b> {data.title}</ProductName>
                                    <ProductId><b>ID:</b> {data._id}</ProductId>
                                    <ProductColor color={data.color} />
                                    <ProductSize><b>Size:</b> {data.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{data.quantity}</ProductAmount>
                                    <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>${data.price * data.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product> 
                    ))}
                    <Hr />
                </Info>
              
                <Sunmary>
                    <SunmaryTitle>ORDER SUNMARY</SunmaryTitle>
                    <SunmaryItem>
                        <SunmaryItemText>SubTotal</SunmaryItemText>
                        <SunmaryItemPrice>${cart.total}</SunmaryItemPrice>
                    </SunmaryItem>
                    <SunmaryItem>
                        <SunmaryItemText>Estimated Shipping</SunmaryItemText>
                        <SunmaryItemPrice>$5.90</SunmaryItemPrice>
                    </SunmaryItem>
                    <SunmaryItem>
                        <SunmaryItemText>Shipping Discount</SunmaryItemText>
                        <SunmaryItemPrice>$80</SunmaryItemPrice>
                    </SunmaryItem>
                    <SunmaryItem type="total">
                        <SunmaryItemText>Total</SunmaryItemText>
                        <SunmaryItemPrice>${cart.total}</SunmaryItemPrice>
                    </SunmaryItem>
                    <StripeCheckout
                        name="Wildan Shop"
                        image="https://avatars.githubusercontent.com/u/69356845?v=4"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <SunmaryButton>CHECKOUT NOW</SunmaryButton>
                    </StripeCheckout>
                </Sunmary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart
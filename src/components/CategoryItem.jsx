import React from 'react'
import styled from 'styled-components'
import {mobile} from "./../responsive"
import {
    Link
  } from "react-router-dom";

const Container = styled.div`
    flex:1;
    margin:3px;
    height:70vh;
    position:relative;
`
const Image = styled.img`
   width:100%;
   height:100%;
   object-fit:cover;
   ${mobile({
    height:"20vh"
})}
`
const Info = styled.div`
   width:100%;
   height:100%;
   position:absolute;
   top:0;
   left:0;
   display:flex;
   align-items:center;
   flex-direction:column;
   justify-content:center;
`
const Title = styled.h1`
    color:white;
    margin-bottom:20px;
`
const Button = styled.button`
    border:none;
    padding:10px;
    background-color:white;
    color:grey;
    cursor:pointer;
    font-weight:600;
`

const CategoryItem = ({item}) => {
  const url = "products/"+item.category;
  return (
    <Container>
        <Image src={item.img} />
        <Info>
            <Title>{item.title}</Title>
            <Button><Link to={url}>SHOP NOW</Link></Button>
        </Info>
    </Container>
  )
}

export default CategoryItem
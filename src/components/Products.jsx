import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product.jsx'
import axios from "axios"

const Container = styled.div`
    padding:20px;
    display:flex;    
    flex-wrap:wrap;
    justify-content:space-between;
`
const Loading = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:30px;
`



const Products = ({category,filter,sort}) => {
  const [products,setProducts] = useState([]);
  const [filteredProduct,setFilteredProduct]=useState([])
  const [loading,setLoading] = useState(true);

 

  useEffect(()=>{
     console.log('okeoke')
    async function getProducts() {
      try {
        const response = await axios.get(category ? 'http://localhost:5000/api/products?category='+category : 'http://localhost:5000/api/products/');
        setTimeout(()=>{
          setProducts(response.data)
          setLoading(false)
        },2000)
      
        
      } catch (error) {
        console.error(error);
      }
    }
    getProducts()
    
  },[category])

  useEffect(()=>{
    console.log('oke2')
      category && setFilteredProduct(
        products.filter(item => Object.entries(filter).every(([key,value])=>
          item[key].includes(value)))
        )
  },[filter,category,products])

  useEffect(()=>{
    if(sort==="newest"){
      setFilteredProduct(prev=>
        [...prev].sort((a,b)=>a.createdAt-b.createdAt)
      )
    }else if(sort==="asc"){
      setFilteredProduct(prev=>
        [...prev].sort((a,b)=>a.price-b.price)
      )
    }else{
      setFilteredProduct(prev=>
        [...prev].sort((a,b)=>b.price-a.price)
      )
    }
  },[sort])

  if(loading){
    return(
      <>
          <Loading>LOADING.</Loading>
      </>
    )
  }
  if(products.length==0){
    return(
      <>
          <Loading>KOSONG</Loading>
      </>
    )
  } 


  return (
    <Container>
        {category ? 
        filteredProduct.map((data)=>(<Product item={data} key={data.id} />))
        :
        products.map((data)=>(<Product item={data} key={data.id} />))
        }
    </Container>
  )
}

export default Products
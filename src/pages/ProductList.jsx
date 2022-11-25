import React, { useState } from 'react'
import styled from "styled-components"
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Products from '../components/Products'
import {mobile} from "./../responsive"
import { useLocation } from 'react-router-dom'
const Container = styled.div`

`

const Title = styled.h1`
    margin:20px
`

const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
`

const Filter = styled.div`
    margin:20px;
    ${mobile({
        width:"0ppx 20px",
        display:"flex",
        flexDirection:"column"
    })}
`

const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({
        marginRight:"0px"
    })}
`

const Select = styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({
        margin:"10px 0px"
    })}
`

const Option = styled.option`

`

const ProductList = () => {
  const location = useLocation()
  const path = location.pathname.split("/")
  const category = path[2] && path[2]; 

  //state
  const [filter,setFilter]=useState({})
  const [sort,setSort]=useState("newest")
  const handleChangeFilter = (e)=>{
    const value = e.target.value
    setFilter({
        ...filter,
        [e.target.name]:value
    })
  }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{category}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleChangeFilter}>
                    <Option disabled selected>Color</Option>
                    <Option value="white">White</Option>
                    <Option value="black">Black</Option>
                    <Option value="red">Red</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="yellow">Yellow</Option>
                </Select>
                <Select name="size" onChange={handleChangeFilter}>
                    <Option disabled selected>Size</Option>
                    <Option>S</Option>
                    <Option>L</Option>
                    <Option>M</Option>
                    <Option>XL</Option>
                    <Option>XXL</Option>
                </Select>
            </Filter>
            <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e)=>setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products category={category} filter={filter} sort={sort} />
        <NewsLetter />
        <Footer />
    </Container>
  )
}

export default ProductList
import React from 'react'
import styled from 'styled-components'
import {categories} from "./../data/data.js";
import CategoryItem from './CategoryItem';
import {mobile}from "./../responsive"
const Container = styled.div`
    display:flex;
    padding:20px;
    justify-content:space-between;
    ${mobile({
      padding:"0px",
      flexDirection:"column"
  })}
`

const Categories = () => {
  return (
    <Container>
      {categories.map((data)=>(
        <CategoryItem item={data} />
      ))}
    </Container>
  )
}

export default Categories

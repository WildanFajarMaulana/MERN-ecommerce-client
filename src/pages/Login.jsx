import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { login } from '../redux/apiCalls'
import {mobile} from "./../responsive"

const Container = styled.div`
    width:100vw;
    height:100vh;
    background:linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
        ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")center;
    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Wrapper = styled.div`
        padding:20px;
        width:25%;
        background-color:white;
        ${mobile({
            width:"75%"
        })}
`

const Form = styled.form`
        display:flex;
        flex-wrap:wrap;
        flex-direction:column
`

const Title = styled.h1`
        font-size:24px;
        font-weight:300;
`

const Input = styled.input`
        flex:1;
        min-width:40%;
        margin:20px 10px 0px 0px;
        padding:10px;
`

const Link = styled.a`
        font-size:12px;
        text-decoration:underline;
        cursor:pointer;
        margin:5px 0px;
`

const Button = styled.button`
        width:40%
        border:none;
        padding:15px 20px;
        margin:20px 10px 0px 0px;
        background-color:teal;
        color:white;
        cursor:pointer;
        &:disabled{
            color:green;
            cursor:not-allowed;
        }
`

const Error = styled.span`
        color:red;
`

const Login = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector(state=>state.user)
  const handleLogin = (e) =>{
    e.preventDefault()
    login(dispatch,{username,password})
  }

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}  />
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
                {error && <Error>Something went wrong</Error>}
                <Link>DO NOT YOU REMEMBER THE PASSWORD</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
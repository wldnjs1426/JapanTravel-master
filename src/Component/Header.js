import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import Cookies from 'universal-cookie';


const Wrap = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  position:fixed;
  align-items: center;
  border-bottom:1px solid gray;
  background-color:white;
  z-index:5;
`
const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginSection = styled.section`
  width:5%;
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`
const Span = styled.span`
  width: 200px;
  text-align: center;
  color:black;
`
const Img = styled.img`
  height:55px;
`
const LoginDiv = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: white;
    width:500px;
    height:300px;
    z-index:7;
    visibility:${props => props.login ? "visible" : "hidden"};
    border:1px solid black;
` 
const LoginHeader = styled.header`
  width:100%;
  height:15%;
  display:flex;
  justify-content:center;
  align-items:center;
  border-bottom:1px solid brown;
`
const Div = styled.div`
  width:100%;
  height:90%;
  display:flex;
  flex-direction: column;
  justify-content:center;;
  align-items:center;
`
const Ul = styled.ul`
  width:100%;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`
const Li = styled.li`
  height:60px;
`
const Input = styled.input`
  width:250px;
  height:30px;
  border-radius:3px;
`
const OverLay = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  background-color: rgba(61, 60, 60, 0.555);
  visibility:${props => props.login ? "visible" : "hidden"};
  z-index:6;
`
function Header(){

  const cookies = new Cookies();
  const [login,setLogin] = useState(false)
  const [loginAdmin,setloginAdmin] = useState(cookies.get('token') === undefined ? true : false)


  

  const setLoginModal = (bool)=>{
    window.scrollTo(0,0);
    if(bool){
      cookies.remove('token')
      setloginAdmin(true)
    }else{
      login ? setLogin(false) : setLogin(true)
    }
  }

  const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      setLoginModal(true);
      Axios.post('http://13.209.82.0:5000/login',data
            ).then((res) => {
              if(res.data === false){
                alert("아이디와 비밀번호를 입력해주세요")
              }else{
                const token = res.data;
                window.location.reload()
                cookies.set('token', token, { path: '/' });
                setloginAdmin(false)
              }
            }).catch((err) => {

            });
    }

    return(
      <>
          <Wrap>
                <Section>
                  <Link to={`/`}>
                    <Span><Img src='/image/icon/logo.png'/></Span>
                  </Link>
                </Section>
                
                <LoginSection onClick={()=>setLoginModal(cookies.get('token') === undefined ? false : true)}>
                {loginAdmin ? `Login` : `admin`}
                </LoginSection>

          </Wrap>

          <LoginDiv login={login}>

            <LoginHeader >
              Login
            </LoginHeader>
            <Div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Ul>
                  <Li><Input type="text" name="id"  placeholder="Id" {...register("id")}/></Li>
                  <Li><Input type="password" name="password" placeholder="Password" {...register("password")} /></Li>
                </Ul>
                <input type="submit" value="Login"/>
              </form>
            </Div>
          </LoginDiv>
          <OverLay login={login} onClick={()=>setLoginModal()}>
          </OverLay>
        </>

    )
}
export default Header